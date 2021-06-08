import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiclesPageRoutingModule } from './vehicles-routing.module';

import { VehiclesPage } from './vehicles.page';

import { SellLastPageModule } from '../extras/sell-last/sell-last.module';
import { SellHeaderPageModule } from "../extras/sell-header/sell-header.module"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiclesPageRoutingModule,
    SellLastPageModule,
    SellHeaderPageModule
  ],
  declarations: [VehiclesPage],
  exports:[VehiclesPage]
})
export class VehiclesPageModule {}
