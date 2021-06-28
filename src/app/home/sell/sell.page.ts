import { Component} from '@angular/core';
import { AnimationController, NavController } from "@ionic/angular"
import { Plugins } from "@capacitor/core"

import { HomeTabsService } from '../hide-home-tabs.service';


var { Storage } = Plugins
@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage {
  category = [
    [{
      title: "Mobile",
      path: "assets/category/mobile.svg"
    },
    {
      title: "Vehicles",
      path: "assets/category/vehicle.svg"
    }],
    [{
      title: "Electronics",
      path: "assets/category/electronics.svg"
    },
    {
      title: "Home Appliances",
      path: "assets/category/home-app.svg"
    }],
    [{
      title: "Bikes",
      path: "assets/category/bike.svg"
    },
    {
      title: "Food & Medic",
      path: "assets/category/general.svg"
    }],
  ]
  
  constructor(
    public nav: NavController,
    private homeTabs:HomeTabsService,
    private animation:AnimationController
  ) { 
    
  }

  ionViewWillEnter(){
    this.homeTabs.showHomeTabs()
  }
  ngAfterViewInit() {
      
  }

  //checks if user is authenticated  via email and phone else send him for authentication

  async toSeller(product) {
    product = product.toLowerCase().split(' ')[0]
    var user = await Storage.get({ key: "user_of_eshop" })
    if (!user.value) {
      localStorage.removeItem("viewed")           //for install router guard 
      this.nav.navigateForward(["install"])
    }
    else this.nav.navigateForward(["/home/expand-cate", { product: product, from: "sell" }], {
      animated: true,
      animation:(baseEl,opts)=>{
        return this.animation.create()
          .addElement(opts.enteringEl)
          .fromTo('opacity','1','1')
          .fromTo('left','-200px','0px')
          .duration(200)
          .easing('ease-in')
      } 
    })
  }

  doRefresh(event) {
    setTimeout(() => {
      location.reload()
      event.target.complete();
    }, 2000);
  }
}
