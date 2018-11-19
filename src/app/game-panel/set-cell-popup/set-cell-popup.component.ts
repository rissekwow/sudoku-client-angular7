import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CellInfo } from 'src/app/shared/model/cell-info';
import { DialogDraggableTitleDirective } from './dialog-draggable-title.directive';
import { SudokuBoardCellChangeService } from 'src/app/shared/services/sudoku-board-cell-change.service';

@Component({
  selector: 'app-set-cell-popup',
  templateUrl: './set-cell-popup.component.html',
  styleUrls: ['../game-panel.component.css']
})
export class SetCellPopupComponent {

  isCellEmpty: boolean;

  constructor(private sudokuBoardCellChangeService: SudokuBoardCellChangeService,
    public dialogRef: MatDialogRef<DialogDraggableTitleDirective>,
    @Inject(MAT_DIALOG_DATA) public data: CellInfo) {
    this.isCellEmpty = data.value === null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enterValueToCellEvent(number: number) {
    let cellInfo = this.data;
    cellInfo.value = number;
    this.sudokuBoardCellChangeService.cellInfoChangeEvent.next(cellInfo);
    this.dialogRef.close();
  }

}
