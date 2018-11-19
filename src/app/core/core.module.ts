import { NgModule } from "@angular/core";
import { SidenavMenuComponent } from "./sidenav-menu/sidenav-menu.component";
import { MatSidenavModule, MatDialogModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { SudokuServerService } from "../shared/services/sudoku-server.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "../app-routing.module";
import { SudokuBoardCellChangeService } from "../shared/services/sudoku-board-cell-change.service";

@NgModule({
    declarations: [
      SidenavMenuComponent
    ],
    imports: [
      BrowserModule,
      MatSidenavModule,
      MatDialogModule,     
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatListModule,
      BrowserAnimationsModule,
      AppRoutingModule
    ],
    exports: [
      SidenavMenuComponent
    ],
    providers: [SudokuServerService, SudokuBoardCellChangeService]
  })
export class CoreModule {

}