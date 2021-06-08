import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HomeTabsService } from '../../hide-home-tabs.service';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.page.html',
  styleUrls: ['./furniture.page.scss'],
})
export class FurniturePage implements OnInit {
  item
  constructor(private nav:NavController,private active:ActivatedRoute,private homeTabs:HomeTabsService) {
    this.active.params.subscribe(data=>{
       this.item=data["item"]
    })
    this.homeTabs.hideHomeTabs()
   }

  ngOnInit() {
  }

  gotData(data){
    if(!data) return
    this.nav.navigateForward(["/home/sell/price", { product: "Furniture & Decorator", item: this.item, data: JSON.stringify(data)}])
  }

}
