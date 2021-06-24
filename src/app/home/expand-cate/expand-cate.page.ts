import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { NavController } from '@ionic/angular';
import { list } from './data.list';
import { HomeTabsService } from "../hide-home-tabs.service"
var flag
@Component({
  selector: 'app-expand-cate',
  templateUrl: './expand-cate.page.html',
  styleUrls: ['./expand-cate.page.scss'],
})
export class ExpandCatePage {
  header: String
  product
  from
  category = []
  constructor(
    private route: ActivatedRoute,
    public nav: NavController,
    private homeTabs: HomeTabsService
  ) {
    this.route.params.subscribe(data => {
      this.product = data["product"]
      this.from = data["from"]
      var { product } = this
      this.header = product[0].toUpperCase() + product.slice(1, product.length)
      this.category = [...list[product]] //because program treating list as static data
      this.checkRoute()
    })
  }

  checkRoute() {
    if (/sell/.test(this.from)) {
      this.category.pop()
    }
    else {
      this.category.forEach((element, index) => {
        if (/Other/.test(element)) {
          this.category.splice(index, 1)
        }
      });
    }
  }

  goNext(product_item) {
    if (this.from.includes("sell")) {
      this.nav.navigateForward(["home/sell/" + this.product, { item: product_item }])
    }
    else {
      this.nav.navigateBack(["home/explore", { product: this.product, item: product_item }])
    }
  }

  back() {
    this.nav.pop()
  }

}
