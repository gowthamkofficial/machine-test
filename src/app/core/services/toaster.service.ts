import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(message: string, action: string = 'Close', duration: number = 3000, panelClass: string = '') {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass
    });
  }

  success(message: string) {
    this.showMessage(message, 'OK', 3000, 'success-snackbar');
  }

  error(message: string) {
    this.showMessage(message, 'OK', 3000, 'error-snackbar');
  }

  warning(message: string) {
    this.showMessage(message, 'OK', 3000, 'warning-snackbar');
  }

  info(message: string) {
    this.showMessage(message, 'OK', 3000, 'info-snackbar');
  }
}
