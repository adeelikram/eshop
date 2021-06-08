import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectronicsPage } from './electronics.page';

const routes: Routes = [
  {
    path: '',
    component: ElectronicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectronicsPageRoutingModule {}
