import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './common/component/page-not-found/page-not-found.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/flight-search',
    pathMatch: 'full'
  },
  {
    path: 'flight-search',
    loadChildren: () => import('./flight-search/flight-search.module').then(m => m.FlightSearchModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
