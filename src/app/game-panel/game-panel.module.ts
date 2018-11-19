import { NgModule } from "@angular/core";
import { GamePanelComponent } from "./game-panel.component";
import { SetCellPopupComponent } from "./set-cell-popup/set-cell-popup.component";
import { FormsModule } from "@angular/forms";
import { MatDialogModule, } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { DialogDraggableTitleDirective } from "./set-cell-popup/dialog-draggable-title.directive";
import { AlertDialogComponent } from "../alert-dialog/alert-dialog.component";
import { NgProgressModule } from "ngx-progressbar";

@NgModule({
    declarations: [
      GamePanelComponent,
      SetCellPopupComponent,
      AlertDialogComponent,
      DialogDraggableTitleDirective
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      MatDialogModule,
      NgProgressModule
    ],
    entryComponents: [SetCellPopupComponent, AlertDialogComponent],
    exports: [GamePanelComponent],
    providers: [],
  })
export class GamePanelModule {

}