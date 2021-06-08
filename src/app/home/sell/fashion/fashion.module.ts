import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FashionPageRoutingModule } from './fashion-routing.module';

import { FashionPage } from './fashion.page';
import { SellHeaderPageModule } from "../extras/sell-header/sell-header.module"
import { SellLastPageModule } from "../extras/sell-last/sell-last.module"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FashionPageRoutingModule,
    SellHeaderPageModule,
    SellLastPageModule
  ],
  declarations: [FashionPage]
})
export class FashionPageModule {}
