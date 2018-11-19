import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SudokuBoard } from '../shared/model/sudoku-board';
import { CellInfo } from '../shared/model/cell-info';
import { SudokuBoardJson } from '../shared/model/sudoku-board-json';
import { NextMoveJson } from '../shared/model/next-move-json';
import { SudokuServerService } from '../shared/services/sudoku-server.service';
import { SetCellPopupComponent } from './set-cell-popup/set-cell-popup.component';
import { SudokuBoardCellChangeService } from '../shared/services/sudoku-board-cell-change.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

enum SUDOKU_GAME_LEVELS {
  Easy, Medium, Hard
};
enum SUDOKU_STATUS {
  EMPTY, GENERATED, INGAME, SOLVABLE, NOTSOLVABLE, SOLVED
};


@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent implements OnInit {

  sudokuBoardArray: CellInfo[][];
  sudokuStatusType: any = SUDOKU_STATUS;
  sudokuLevels: SUDOKU_GAME_LEVELS;
  sudokuStatus: SUDOKU_STATUS;
  @ViewChild("generateGameForm") generateSudokuForm: NgForm;
  private popupDialogWidth: string = "300px";
  private popupDialogHeight: string = "340px";

  constructor(private sudokuServerService: SudokuServerService,
    private sudokuBoardCellChangeService: SudokuBoardCellChangeService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.sudokuStatus = SUDOKU_STATUS.EMPTY;
    this.generateEmptySudokuBoard();
    this.sudokuBoardCellChangeService.cellInfoChangeEvent.subscribe((cellInfo) => {
      this.sudokuBoardArray[cellInfo.x][cellInfo.y] = cellInfo;
    });
  }

  gameLevelsList(): Array<string> {
    var keys = Object.keys(SUDOKU_GAME_LEVELS);
    return keys.slice(keys.length / 2, keys.length);
  }

  generateSolvableSudokuBoardBasedOnLevel() {
    this.sudokuServerService.generateRandomBoard(this.generateSudokuForm.value.choosedLevel)
      .subscribe(
        (response: SudokuBoard) => {
          this.sudokuBoardArray = response.sudokuBoardCells;
          this.sudokuStatus = SUDOKU_STATUS.GENERATED;
        },
        (error) => {
          console.log(error);
          const dialogRef = this.dialog.open(AlertDialogComponent, {
            width: this.popupDialogWidth,
            height: this.popupDialogHeight,
            autoFocus: true,
            data: "Application can't reach server URL."
          });
        }
      )
  }

  findNextMove() {
    let sudokuBoardNumberArray: number[][] = this.convertCellInfoArrayToNumberArray(this.sudokuBoardArray);
    let emptyCellsInBoardNumber = this.calculateEmptyCells(sudokuBoardNumberArray);

    if (emptyCellsInBoardNumber === 0) {
      this.canSudokuBeSolve();
      return;
    }

    this.sudokuServerService.findNextMove(new SudokuBoardJson(sudokuBoardNumberArray))
      .subscribe(
        (response: NextMoveJson) => {
          this.sudokuBoardArray[response.x][response.y].value = response.value;
          this.sudokuStatus = SUDOKU_STATUS.INGAME;
        },
        (error) => {
          this.sudokuStatus = SUDOKU_STATUS.NOTSOLVABLE;
        }
      )
  }

  sudokuCellClickEvent(cell: CellInfo) {
    if (cell.isGenerated) return;

    const dialogRef = this.dialog.open(SetCellPopupComponent, {
      width: this.popupDialogWidth,
      height: this.popupDialogHeight,
      autoFocus: true,
      data: new CellInfo(cell.x, cell.y, cell.value, cell.isGenerated)
    });

    dialogRef.afterClosed().subscribe(result => {
      this.sudokuStatus = SUDOKU_STATUS.INGAME;
    });

  }

  canSudokuBeSolve() {
    let sudokuBoardNumberArray: number[][] = this.convertCellInfoArrayToNumberArray(this.sudokuBoardArray);
    let emptyCellsInBoardNumber = this.calculateEmptyCells(sudokuBoardNumberArray);

    this.sudokuServerService.isBoardSolvable(new SudokuBoardJson(sudokuBoardNumberArray))
      .subscribe(
        (response: boolean) => {
          if (response === true) {
            if (emptyCellsInBoardNumber === 0) {
              this.sudokuStatus = SUDOKU_STATUS.SOLVED;
              return;
            }
            this.sudokuStatus = SUDOKU_STATUS.SOLVABLE;
            return;
          }
        },
        (error) => {
          this.sudokuStatus = SUDOKU_STATUS.NOTSOLVABLE;
        }
      )
  }

  private convertCellInfoArrayToNumberArray(sudokuBoardArray: CellInfo[][]) {
    var sudokuBoardNumberArray: number[][] = [];

    for (var i = 0; i < this.sudokuBoardArray.length; i++) {
      sudokuBoardNumberArray[i] = [];
      for (var j = 0; j < this.sudokuBoardArray[i].length; j++) {
        sudokuBoardNumberArray[i][j] = this.sudokuBoardArray[i][j].value !== null ? this.sudokuBoardArray[i][j].value : 0;
      }
    }
    return sudokuBoardNumberArray;
  }

  private calculateEmptyCells(sudokuBoardNumberArray: number[][]) {
    var emptyCells = 0;
    for (var i = 0; i < sudokuBoardNumberArray.length; i++) {
      for (var j = 0; j < this.sudokuBoardArray[i].length; j++) {
        if (sudokuBoardNumberArray[i][j] === 0) emptyCells++;
      }
    }
    return emptyCells;
  }

  private generateEmptySudokuBoard() {
    this.sudokuBoardArray = [];
    for (var i: number = 0; i < 9; i++) {
      this.sudokuBoardArray[i] = [];
      for (var j: number = 0; j < 9; j++) {
        this.sudokuBoardArray[i][j] = new CellInfo(i, j, null, false);
      }
    }
  }
}
