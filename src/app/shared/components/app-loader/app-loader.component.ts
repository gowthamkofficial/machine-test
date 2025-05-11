import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-app-loader',
  standalone:true,
  templateUrl: './app-loader.component.html',
  imports:[CommonModule, MatProgressSpinnerModule],
  styleUrls: ['./app-loader.component.css']
})
export class AppLoaderComponent implements OnInit {
  title!: string;
  message: any;
  constructor(public dialogRef: MatDialogRef<AppLoaderComponent>) {}

  ngOnInit() {
  }

}
