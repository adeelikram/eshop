import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellHeaderPage } from './sell-header.page';

const routes: Routes = [
  {
    path: '',
    component: SellHeaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellHeaderPageRoutingModule {}
