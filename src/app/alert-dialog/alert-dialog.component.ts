import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogDraggableTitleDirective } from '../game-panel/set-cell-popup/dialog-draggable-title.directive';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {

  constructor(public dialogRef: MatDialogRef<DialogDraggableTitleDirective>,
    @Inject(MAT_DIALOG_DATA) public alertMessage: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  exitFromAlert() {
    this.dialogRef.close();
  }
}
