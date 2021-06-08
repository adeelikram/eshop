import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobilePageRoutingModule } from './mobile-routing.module';

import { MobilePage } from './mobile.page';

import { SellLastPageModule } from "../extras/sell-last/sell-last.module"
import { SellHeaderPageModule } from "../extras/sell-header/sell-header.module"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobilePageRoutingModule,
    SellLastPageModule,
    SellHeaderPageModule
  ],
  declarations: [MobilePage],
})
export class MobilePageModule { }
