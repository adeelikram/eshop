import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PricePage } from './price.page';

const routes: Routes = [
  {
    path: '',
    component: PricePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricePageRoutingModule {}
