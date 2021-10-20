import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MenuController, NavController, AnimationController, IonSearchbar, ModalController, PopoverController } from "@ionic/angular"
import { HomeTabsService } from '../hide-home-tabs.service';
import { FilterComponent } from "./filter/filter.component"

@Component({
  selector: 'app-in-home',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage {
  // category = [
  //   [{
  //     title: "Mobile",
  //     path: "assets/category/mobile.svg"
  //   },
  //   {
  //     title: "Vehicles",
  //     path: "assets/category/vehicle.svg"
  //   },
  //   {
  //     title: "Electronics",
  //     path: "assets/category/electronics.svg"
  //   }],
  //   [{
  //     title: "Home Appliances",
  //     path: "assets/category/home-app.svg"
  //   },
  //   {
  //     title: "Bikes",
  //     path: "assets/category/bike.svg"
  //   },
  //   {
  //     title: "Food & Mediciene",
  //     path: "assets/category/general.svg"
  //   }],
  // ]

  // show to display
  @ViewChild("input", { static: false }) input: IonSearchbar
  show = []
  // actual data will be placed in data property for operations
  data = []
  hideSpin = false
  search: any = undefined
  constructor(
    private menu: MenuController,
    private nav: NavController,
    private animate: AnimationController,
    private afa: AngularFirestore,
    private hideHomeTabs: HomeTabsService,
    private route: ActivatedRoute,
    private pop: PopoverController
  ) {
    this.menu.enable(true)
  }

  async ngOnInit() {
    this.data = (await this.afa.firestore.collectionGroup("eshop").orderBy("date", "desc").get()).docs
    this.show = [...this.data]
    this.hideSpin = true
    this.ionViewDidEnter()
  }

  readParams() {
    this.search = {
      product: this.route.snapshot.paramMap.get("product"),
      item: this.route.snapshot.paramMap.get("item")
    }
  }

  ionViewDidEnter() {
    this.readParams()
    if (this.search.product) {
      this.filterCateItem()
      if (this.search?.product) this.input.value = this.search.product + " " + this.search.item
    }
  }

  filterCateItem() {
    this.show = this.data.filter(val => {
      return val.data().product.toLowerCase().includes(this.search.product.toLowerCase()) && (val.data().item.toLowerCase().includes(this.search.item.toLowerCase()) || this.search.item.toLowerCase().includes("view"))
    })
  }

  async openFilter() {
    var modal = await this.pop.create({ component: FilterComponent, animated: false, cssClass: "increase_hw" })
    await modal.present()
    var modal_data: { from: String, to: String, date: String } = (await modal.onDidDismiss()).data

    this.show = this.data.filter(val => {
      var price = Number(val.data().data.price)
      var _date = Number(val.data().date)
      var bool = (price >= Number(modal_data.from) || !modal_data.from) && (price <= Number(modal_data.to) || !modal_data.to)
      var date = (modal_data.date == "today") ? (new Date(Date.now() - _date).getDate() == 1) : (modal_data.date == "week") ? (new Date(Date.now() - _date).getDate() < 7) : (modal_data.date == "month") ? (new Date(Date.now() - _date).getMonth() < 1) : (modal_data.date == 'year') ? (new Date(Date.now() - _date).getFullYear() == 1970) : true
      return bool && date
    })
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

  getVal(el: IonSearchbar) {

    this.hideSpin = false
    if (!el.value) {
      this.show = [...this.data]
      this.hideSpin = true
      return
    }
    var list = el.value.split(/[\s/*-+,"':-]+/g)
    list = list.map(el => { return el.toLowerCase() })
    this.show = this.data.filter(val => {
      var local_data = val.data()
      var flag = false
      list.map(el => {
        if (local_data.product.toLowerCase().includes(el) || local_data.item.toLowerCase().includes(el)) {
          flag = true
        }
      })
      console.log(flag)
      if (flag) return flag

      var keys = Object.keys(local_data.data)
      let bool: Boolean
      for (var el of keys) {
        for (var in_el of list) {
          bool = local_data.data[el].toLowerCase().includes(in_el)
          if (bool) {
            return bool
          }
        }
      }
    })
    this.hideSpin = true

  }

  async passDataToShowAd(i) {
    var parent, product

    parent = (await i.ref.parent.parent.get()).data()
    product = i.data()

    this.hideHomeTabs.hideHomeTabs()
    this.nav.navigateForward(["home/show-ad", { data: JSON.stringify({ parentData: parent, productData: product }), from: "explore", id: i.id }])
  }

  doRefresh(event) {
    setTimeout(() => {
      location.reload()
      event.target.complete();
    }, 2000);
  }

}
