import { Component, OnInit } from '@angular/core';
import * as list from "./data.list"
import { NavController } from "@ionic/angular"
import { ActivatedRoute } from '@angular/router';
import { HomeTabsService } from '../../hide-home-tabs.service';
@Component({
  selector: 'app-house',
  templateUrl: './house.page.html',
  styleUrls: ['./house.page.scss'],
})
export class HousePage implements OnInit {
  item
  types
  errors = []
  input = { type: null }
  constructor(private nav: NavController, private active: ActivatedRoute,private homeTabs:HomeTabsService) {
    this.active.params.subscribe(data => {
      this.item = data["item"]
      var split = this.item.split(" ")[0]
      this.types = (/Kitchen|Other Home Appliances/.test(this.item)) ? list[split] : null
      if (!this.types) {
        delete this.input.type
      }

    })
    this.homeTabs.hideHomeTabs()
  }

  ngOnInit() {
  }

  Errors() {
    if (this.types) {
      var { type } = this.input
      if (!type) {
        this.errors[0] = `Please Select your Item type`
        return false
      }
      else {
        this.errors = []
        return true
      }
    }
    return true
  }
  gotData(data) {
    var temp = this.Errors()
    if (!data || !temp) return
    Object.assign(this.input, data)
    this.nav.navigateForward(['/home/sell/price', { product: "Home Appliances", item: this.item, data: JSON.stringify(this.input) }])
  }
}
