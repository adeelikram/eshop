import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BikesPageRoutingModule } from './bikes-routing.module';

import { BikesPage } from './bikes.page';
import { VehiclesPageModule } from "../vehicles/vehicles.module"
import { SellHeaderPageModule } from '../extras/sell-header/sell-header.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BikesPageRoutingModule,
    VehiclesPageModule,
    SellHeaderPageModule
  ],
  declarations: [BikesPage]
})
export class BikesPageModule {}
