import { EventEmitter } from "@angular/core";
import { CellInfo } from "../model/cell-info";

export class SudokuBoardCellChangeService {

    cellInfoChangeEvent = new EventEmitter<CellInfo>();

}