import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HomeTabsService } from '../../hide-home-tabs.service';

import { computer, camera, generator } from "./data.list"
@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.page.html',
  styleUrls: ['./electronics.page.scss'],
})
export class ElectronicsPage {
  item
  types
  errors = []
  input = { type: null }
  constructor(private active: ActivatedRoute, private nav: NavController,private homeTabs:HomeTabsService) {
    this.active.params.subscribe(params => {
      this.item = params["item"]
      var { item } = this
      this.types = this.getTypes(item)
      if (/TV/.test(this.item)) {
        this.input.type = "video-audio"
      }
    })
    this.homeTabs.hideHomeTabs()
  }

  getTypes(item) {
    return (/Computer/.test(item)) ? computer : (/Camera/.test(item)) ? camera : (/Generator/.test(item)) ? generator : null
  }

  Errors() {
    if (this.types) {
      var { type } = this.input
      if (!type) {
        this.errors[0] = `Please Select Item type`
        return false
      }
      else {
        this.errors = []
        return true
      }
    }
    return true
  }

  ngOnInit() {

  }


  gotData(data) {
    var temp = this.Errors()
    Object.assign(this.input, data)
    if (!data || !temp) return
    this.nav.navigateForward(['/home/sell/price', { product: "Electronics", item: this.item, data: JSON.stringify(this.input) }])
  }

}
