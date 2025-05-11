import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  showAlert(
    title: string,
    description: string,
    options?: {
      image?: string;
      icon?: string;
      okButtonText?: string;
      cancelButtonText?: string;
      showOk?: boolean;
      showCancel?: boolean;
      allowClose?:boolean,
      animation?:any
    }
  ){
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '450px',
      disableClose:options?.allowClose??false,
      data: {
        title,
        description,
        image: options?.image,
        icon: options?.icon,
        okButtonText: options?.okButtonText,
        cancelButtonText: options?.cancelButtonText,
        showOk: options?.showOk !== false, // Default true
        showCancel: options?.showCancel === true, // Default false
        animation : options?.animation
      },
      panelClass: 'alert-dialog-container',
    });

    return dialogRef.afterClosed( )
  }
}
