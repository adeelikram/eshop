import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BikesPage } from './bikes.page';

const routes: Routes = [
  {
    path: '',
    component: BikesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BikesPageRoutingModule {}
