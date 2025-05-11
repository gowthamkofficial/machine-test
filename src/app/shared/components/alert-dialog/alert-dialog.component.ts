import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
interface AlertDialogData {
  allowClose: boolean;
  title: string;
  description: string;
  image?: string;
  icon?: string;
  okButtonText?: string;
  cancelButtonText?: string;
  showOk?: boolean;
  showCancel?: boolean;
  animation?: any

}
@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {

  }

  closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }
}

