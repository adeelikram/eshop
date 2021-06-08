import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NameModelPage } from './name-model.page';

const routes: Routes = [
  {
    path: '',
    component: NameModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NameModelPageRoutingModule {}
