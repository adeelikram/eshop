import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from "@ionic/angular"
import { HomeTabsService } from '../../hide-home-tabs.service';
@Component({
  selector: 'app-fashion',
  templateUrl: './fashion.page.html',
  styleUrls: ['./fashion.page.scss'],
})
export class FashionPage implements OnInit {

  item
  input = { type: null }

  constructor(private nav: NavController, private active: ActivatedRoute,private homeTabs:HomeTabsService) {
    this.active.params.subscribe(data => {
      this.item = data["item"]
      if (/Accessories|Clothes|Footwear|Watches/.test(this.item)) {
        this.input.type = "men"
      }
    })
    this.homeTabs.hideHomeTabs()
  }

  ngOnInit() {
  }

  gotData(data) {
    if (!data) return
    Object.assign(this.input, data)
    this.nav.navigateForward(["/home/sell/price", { product: "Furniture & Decorator", item: this.item, data: JSON.stringify(this.input) }])
  }
}
