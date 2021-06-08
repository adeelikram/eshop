import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SellPage } from './sell.page';

const routes: Routes = [
  {
    path: '',
    component: SellPage
  },
  {
    path: 'mobile',
    loadChildren: () => import('../sell/mobile/mobile.module').then(m => m.MobilePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('../sell/house/house.module').then(m => m.HousePageModule)
  },
  {
    path: 'food',
    loadChildren: () => import('../sell/food/food.module').then(m => m.FoodPageModule)
  },
  {
    path: 'bikes',
    loadChildren: () => import('../sell/bikes/bikes.module').then(m => m.BikesPageModule)
  },
  {
    path: 'electronics',
    loadChildren: () => import('../sell/electronics/electronics.module').then(m => m.ElectronicsPageModule)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('../sell/vehicles/vehicles.module').then(m => m.VehiclesPageModule)
  },
  {
    path: 'sell-last',
    loadChildren: () => import('./extras/sell-last/sell-last.module').then(m => m.SellLastPageModule)
  },
  {
    path: 'animals',
    loadChildren: () => import('../sell/animals/animals.module').then(m => m.AnimalsPageModule)
  },
  {
    path: 'furniture',
    loadChildren: () => import('../sell/furniture/furniture.module').then(m => m.FurniturePageModule)
  },
  {
    path: 'fashion',
    loadChildren: () => import('../sell/fashion/fashion.module').then(m => m.FashionPageModule)
  },
  {
    path: 'books',
    loadChildren: () => import('../sell/books/books.module').then(m => m.BooksPageModule)
  },
  {
    path: 'kids',
    loadChildren: () => import('../sell/kids/kids.module').then(m => m.KidsPageModule)
  },
  {
    path: 'show-ad',
    loadChildren: () => import('../ads/show-ad/show-ad.module').then(m => m.ShowAdPageModule)
  },
  {
    path: 'add-photos',
    loadChildren: () => import('./add-photos/add-photos.module').then(m => m.AddPhotosPageModule)
  },
  {
    path:"price",
    loadChildren:()=>import("./extras/price/price.module").then(m=>m.PricePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellPageRoutingModule { }
