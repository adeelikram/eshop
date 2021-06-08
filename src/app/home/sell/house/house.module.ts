import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HousePageRoutingModule } from './house-routing.module';

import { HousePage } from './house.page';
import { SellHeaderPageModule } from "../extras/sell-header/sell-header.module"
import { SellLastPageModule } from "../extras/sell-last/sell-last.module"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HousePageRoutingModule,
    SellHeaderPageModule,
    SellLastPageModule
  ],
  declarations: [HousePage]
})
export class HousePageModule {}
