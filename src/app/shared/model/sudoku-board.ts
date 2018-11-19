import { CellInfo } from "./cell-info";

export class SudokuBoard {
    sudokuBoardCells: CellInfo[][];

    constructor(sudokuBoardCells: CellInfo[][]) {
        this.sudokuBoardCells = sudokuBoardCells;
    }

}