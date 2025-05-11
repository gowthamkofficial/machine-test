import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecknullPipe } from './checknull.pipe';



@NgModule({
  declarations: [
    ChecknullPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[ChecknullPipe]
})
export class PipesModule { }
