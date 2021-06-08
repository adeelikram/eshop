import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from "@ionic/angular"
import { HomeTabsService } from '../../hide-home-tabs.service';
@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  item
  constructor(private nav: NavController, private active: ActivatedRoute,private homeTabs:HomeTabsService) {
    this.active.params.subscribe(data => {
      this.item = data["item"]
    })
    this.homeTabs.hideHomeTabs()
  }

  ngOnInit() {
  }

  gotData(data) {
    if (!data) return
    this.nav.navigateForward(["/home/sell/price", { product: "Food & Mediciene", item: this.item, data: JSON.stringify(data)}])
  }

}
