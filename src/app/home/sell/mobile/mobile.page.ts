import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from "@ionic/angular"
import { HomeTabsService } from '../../hide-home-tabs.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.page.html',
  styleUrls: ['./mobile.page.scss']
})
export class MobilePage {
  brands = [
    "SAMSUNG",
    "APPLE",
    "HUAWEI",
    "NOKIA",
    "SONY",
    "LG",
    "HTC",
    "MOTOROLA",
    "LENOVO",
    "XIAOMI",
    "GOOGLE",
    "HONOR",
    "OPPO",
    "REALME",
    "ONEPLUS",
    "MEIZU",
    "BLACKBERRY",
    "ASUS",
    "ALCATEL",
    "ZTE",
    "MICROSOFT",
    "VODAFONE",
    "ENERGIZER",
    "CAT",
    "Haier",
    "VIVO",
    "QMAX",
    "Q MOBILE",
    "SHARP",
    "MICROMAX",
    "INFINIX",
    "ULEFONE",
    "TECNO",
    "BLU",
    "ACER",
    "WIKO",
    "PANASONIC",
    "VERYKOOL",
    "PLUM",
    "other"
  ]
 
  error = "No brand has been selected"
  
  //nav params start
  item
  //nav params end
  
  brand_error
  
  
  input = { brand: null }
  
  constructor(public nav: NavController, private active: ActivatedRoute,private homeTabs:HomeTabsService) {
    this.brands = this.brands.sort()
    this.active.params.subscribe(data => {
      this.item = data["item"]
    })
    this.homeTabs.hideHomeTabs()
  }


  brandError() {
    if (!this.input.brand) {
      this.brand_error = this.error
      return false
    }
    else {
      this.brand_error = ""
      return true
    }

  }

  gotData(data){
     var clear = this.brandError()
     if(!clear || !data) return
     data.brand = this.input.brand
     this.nav.navigateForward(["/home/sell/price",{product:"mobile",item:this.item,data:JSON.stringify(data)}])
  }
}
