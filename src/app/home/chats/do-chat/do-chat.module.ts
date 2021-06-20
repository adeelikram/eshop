import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoChatPageRoutingModule } from './do-chat-routing.module';

import { DoChatPage } from './do-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoChatPageRoutingModule
  ],
  declarations: [DoChatPage]
})
export class DoChatPageModule {}
