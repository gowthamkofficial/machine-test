import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSuggestionsComponent } from './profile-suggestions/profile-suggestions.component';
import { MyMatchesComponent } from './my-matches/my-matches.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profile-suggestions' },
  { path: 'profile-suggestions', component: ProfileSuggestionsComponent },
  { path: 'my-matches', component: MyMatchesComponent },
  { path: 'profile-view/:id', component: ProfileViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
