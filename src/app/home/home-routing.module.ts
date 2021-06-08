import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'explore',
        loadChildren: () => import('./explore/explore.module').then(m => m.ExplorePageModule),
      },
      {
        path: 'sell',
        loadChildren: () => import('./sell/sell.module').then(m => m.SellPageModule),
        
      },
      {
        path: 'ads',
        loadChildren: () => import('./ads/ads.module').then(m => m.AdsPageModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('./chats/chats.module').then(m => m.ChatsPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
      },
      {
        path:"",
        redirectTo:"explore",
        pathMatch:"full"
      }
    ]
  },
  {
    path: 'expand-cate',
    loadChildren: () => import('./expand-cate/expand-cate.module').then(m => m.ExpandCatePageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
