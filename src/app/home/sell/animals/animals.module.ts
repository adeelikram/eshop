import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimalsPageRoutingModule } from './animals-routing.module';

import { AnimalsPage } from './animals.page';
import { SellHeaderPageModule } from '../extras/sell-header/sell-header.module';
import { SellLastPageModule } from "../extras/sell-last/sell-last.module"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimalsPageRoutingModule,
    SellHeaderPageModule,
    SellLastPageModule
  ],
  declarations: [AnimalsPage]
})
export class AnimalsPageModule {}
