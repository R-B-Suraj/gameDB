import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'search/:game-search',
    // the second parameter is the value we got from search input.. which wil be passed to the game-search
    component: HomeComponent,
  },
  // new route for details 
  {
    path: 'details/:id',
    component: DetailsComponent,
  }





];

// add router-outlet to the appcomponent


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
