import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectronicsPageRoutingModule } from './electronics-routing.module';

import { ElectronicsPage } from './electronics.page';
import { SellHeaderPageModule } from '../extras/sell-header/sell-header.module';
import { SellLastPageModule } from "../extras/sell-last/sell-last.module"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElectronicsPageRoutingModule,
    SellHeaderPageModule,
    SellLastPageModule
  ],
  declarations: [ElectronicsPage]
})
export class ElectronicsPageModule { }
