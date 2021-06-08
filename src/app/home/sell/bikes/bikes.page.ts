import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HomeTabsService } from '../../hide-home-tabs.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.page.html',
  styleUrls: ['./bikes.page.scss'],
})
export class BikesPage implements OnInit {

  item
  vehicle_attr
  constructor(public nav: NavController, private active: ActivatedRoute,private homeTabs:HomeTabsService) {
    this.active.params.subscribe(data => {
      this.item = data["item"]
    })
    this.homeTabs.hideHomeTabs()
  }

  ngOnInit() {
    if (this.item == "Motorcycles" || this.item == "Scooters") {
          this.vehicle_attr = 'Tractors'
    }
    else this.vehicle_attr = "Other"
  }

  gotData(data) {
    this.nav.navigateForward(["/home/sell/price", { product: "bikes", item: this.item, data: JSON.stringify(data) }])
  }
}
