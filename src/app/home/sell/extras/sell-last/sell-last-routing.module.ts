import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellLastPage } from './sell-last.page';

const routes: Routes = [
  {
    path: '',
    component: SellLastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellLastPageRoutingModule {}
