import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpandCatePageRoutingModule } from './expand-cate-routing.module';

import { ExpandCatePage } from './expand-cate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpandCatePageRoutingModule
  ],
  declarations: [ExpandCatePage]
})
export class ExpandCatePageModule {}
