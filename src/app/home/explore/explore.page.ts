import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuController, NavController, AnimationController } from "@ionic/angular"




@Component({
  selector: 'app-in-home',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage {
  category = [
    [{
      title: "Mobile",
      path: "assets/category/mobile.svg"
    },
    {
      title: "Vehicles",
      path: "assets/category/vehicle.svg"
    },
    {
      title: "Electronics",
      path: "assets/category/electronics.svg"
    }],
    [{
      title: "Home Appliances",
      path: "assets/category/home-app.svg"
    },
    {
      title: "Bikes",
      path: "assets/category/bike.svg"
    },
    {
      title: "Food & Mediciene",
      path: "assets/category/general.svg"
    }],
  ]
  constructor(
    private menu: MenuController,
    private nav: NavController,
    private animate: AnimationController,
    private afa: AngularFirestore
  ) {
    this.menu.enable(true)
  }
  

  goNext(product) {
    product = product.toLowerCase().split(' ')[0]
    this.nav.navigateForward(["/home/expand-cate", { product: product, from: "explore" }], {
      animated: true,
      animation: (baseEl: HTMLElement, opts) => {
        return this.animate.create().addElement(opts.enteringEl)
          .fromTo('transform', 'translateX(200px)', 'translateX(0px)')
          .fromTo("opacity", "1", "1")
          .duration(150)
          ;
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
