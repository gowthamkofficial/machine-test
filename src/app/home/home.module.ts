import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MyMatchesComponent } from './my-matches/my-matches.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileSuggestionsComponent } from './profile-suggestions/profile-suggestions.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MyMatchesComponent,
    ProfileViewComponent,
    ProfileSuggestionsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
