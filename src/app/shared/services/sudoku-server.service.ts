import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/Rx'
import { map } from "rxjs/operators";
import { SudokuBoard } from "../model/sudoku-board";
import { CellInfo } from "../model/cell-info";
import { SudokuBoardJson } from "../model/sudoku-board-json";
import { NextMoveJson } from "../model/next-move-json";

const urlToServer: string = "https://sudoku-generator-app.herokuapp.com/sudoku/";
//const urlToServer: string = "http://localhost:8080/sudoku/";
const generateRandomBoardURL: string = "api/randomBoard";
const generateNextSolutionURL: string = "api/generateNextSolution";
const isBoardSolvableURL: string = "api/checkIsBoardSolvable";

@Injectable()
export class SudokuServerService {
 
    constructor(private httpClient: HttpClient) {
    }

    convertSudokuJsonObjectToSudokuBoard(inputSudokuBoardJson: SudokuBoardJson) {
        let sudokuBoard = new SudokuBoard([]);
        for (var i=0; i<inputSudokuBoardJson.sudokuBoardCells.length; i++) {
            let yCells = inputSudokuBoardJson.sudokuBoardCells[i];
            sudokuBoard.sudokuBoardCells[i] = [];
            for (var j=0; j<yCells.length; j++) {
              sudokuBoard.sudokuBoardCells[i][j] = new CellInfo(i, j, inputSudokuBoardJson.sudokuBoardCells[i][j] === 0 ? null : inputSudokuBoardJson.sudokuBoardCells[i][j], 
                inputSudokuBoardJson.sudokuBoardCells[i][j] === 0 ? false : true);
            }
        }
        
        return sudokuBoard;
    }

    generateRandomBoard(level: string) {     
       return this.httpClient.post(urlToServer + generateRandomBoardURL, level).pipe(
           map((response : SudokuBoardJson) => {
              return this.convertSudokuJsonObjectToSudokuBoard(response);
           })
       )
    }

    findNextMove(sudokuBoard: SudokuBoardJson) {
        return this.httpClient.post(urlToServer + generateNextSolutionURL, sudokuBoard).pipe(
                map((response : NextMoveJson) => {
                    return response;
                })
        );
    }

    isBoardSolvable(sudokuBoard: SudokuBoardJson) {  
        console.log(sudokuBoard);
        return this.httpClient.post(urlToServer + isBoardSolvableURL, sudokuBoard).pipe(
            map((response : boolean) => {
                console.log(response);
               return response;
            })
        )
     }


}