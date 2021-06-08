import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FurniturePageRoutingModule } from './furniture-routing.module';

import { FurniturePage } from './furniture.page';
import { SellHeaderPageModule } from "../extras/sell-header/sell-header.module"
import { SellLastPageModule } from "../extras/sell-last/sell-last.module"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FurniturePageRoutingModule,
    SellHeaderPageModule,
    SellLastPageModule
  ],
  declarations: [FurniturePage]
})
export class FurniturePageModule {}
