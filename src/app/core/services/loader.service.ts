import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppLoaderComponent } from 'src/app/shared/components/app-loader/app-loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private dialogRef!: MatDialogRef<AppLoaderComponent>;
  constructor(private dialog: MatDialog,

  ) { }

  public open(title: string = ''): Observable<boolean> {
    this.dialogRef = this.dialog.open(AppLoaderComponent, { disableClose: true, backdropClass: 'light-backdrop', panelClass: 'loader-custom-class' });
    this.dialogRef.componentInstance.title = title;
    return this.dialogRef.afterClosed();
  }

  public close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
