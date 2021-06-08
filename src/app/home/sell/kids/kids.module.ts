import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KidsPageRoutingModule } from './kids-routing.module';

import { KidsPage } from './kids.page';
import { SellHeaderPageModule } from "../extras/sell-header/sell-header.module"
import { SellLastPageModule } from "../extras/sell-last/sell-last.module"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KidsPageRoutingModule,
    SellHeaderPageModule,
    SellLastPageModule
  ],
  declarations: [KidsPage]
})
export class KidsPageModule {}
