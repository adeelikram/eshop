import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellHeaderPageRoutingModule } from './sell-header-routing.module';

import { SellHeaderPage } from './sell-header.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellHeaderPageRoutingModule
  ],
  declarations: [SellHeaderPage],
  exports:[SellHeaderPage]
})
export class SellHeaderPageModule {}
