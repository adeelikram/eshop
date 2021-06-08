import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellLastPageRoutingModule } from './sell-last-routing.module';

import { SellLastPage } from './sell-last.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellLastPageRoutingModule
  ],
  declarations: [SellLastPage],
  exports:[SellLastPage]
})
export class SellLastPageModule {}
