import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooksPageRoutingModule } from './books-routing.module';

import { BooksPage } from './books.page';
import { SellHeaderPageModule } from "../extras/sell-header/sell-header.module"
import { SellLastPageModule } from '../extras/sell-last/sell-last.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksPageRoutingModule,
    SellHeaderPageModule,
    SellLastPageModule
  ],
  declarations: [BooksPage]
})
export class BooksPageModule { }
