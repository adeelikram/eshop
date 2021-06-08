import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowAdPageRoutingModule } from './show-ad-routing.module';

import { ShowAdPage } from './show-ad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowAdPageRoutingModule
  ],
  declarations: [ShowAdPage]
})
export class ShowAdPageModule {}
