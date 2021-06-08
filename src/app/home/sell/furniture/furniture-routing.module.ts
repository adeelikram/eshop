import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FurniturePage } from './furniture.page';

const routes: Routes = [
  {
    path: '',
    component: FurniturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FurniturePageRoutingModule {}
