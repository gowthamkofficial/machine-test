import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionCardComponent } from './suggestion-card/suggestion-card.component';
import { ProfilesCardComponent } from './profiles-card/profiles-card.component';
import { SharedModule } from '../shared.module';
import { MaterialModule } from '../material.module';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';




@NgModule({
  declarations: [
    SuggestionCardComponent,
    ProfilesCardComponent,
    AlertDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SuggestionCardComponent,
    ProfilesCardComponent,
    AlertDialogComponent

  ]

})
export class ComponentsModule { }
