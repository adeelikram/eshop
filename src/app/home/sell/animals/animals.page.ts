import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { dogs, livestock } from "./data.list"
import { NavController } from "@ionic/angular"
import { HomeTabsService } from '../../hide-home-tabs.service';
@Component({
  selector: 'app-animals',
  templateUrl: './animals.page.html',
  styleUrls: ['./animals.page.scss'],
})
export class AnimalsPage implements OnInit {
  item
  types = {
    dogs: dogs,
    livestock: livestock
  }
  index
  hide_type = false
  errors = []
  input = { type: null }
  constructor(private active: ActivatedRoute, private nav: NavController,private homeTabs:HomeTabsService) {
    this.active.params.subscribe(data => {
      this.item = data["item"]
      this.index = this.item.toLowerCase()
      this.hide_type = !(/dogs|livestock/.test(this.index))
    })
    this.homeTabs.hideHomeTabs()
  }

  ngOnInit() {

  }

  Errors(data) {
    if (/Dogs|LiveStock/.test(this.item)) {
      if (!this.input.type) {
        this.errors[0] = `Select your ${this.item} type`
        return false
      }
      else {
        this.errors = []
        Object.assign(this.input, data)
        return true
      }
    }
    else return true
  }

  gotData(data) {
    var temp = this.Errors(data)
    if (!data || !temp) return
    this.nav.navigateForward(['home/sell/price',{product:"animals",item:this.item,data:this.input}])
  }

}
