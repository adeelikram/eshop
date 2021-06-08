import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NameModelPageRoutingModule } from './name-model-routing.module';

import { NameModelPage } from './name-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NameModelPageRoutingModule
  ],
  declarations: [NameModelPage]
})
export class NameModelPageModule {}
