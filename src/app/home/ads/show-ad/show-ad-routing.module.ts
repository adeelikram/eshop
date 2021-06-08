import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowAdPage } from './show-ad.page';

const routes: Routes = [
  {
    path: '',
    component: ShowAdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowAdPageRoutingModule {}
