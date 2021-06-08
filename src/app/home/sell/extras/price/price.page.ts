import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { NavController } from "@ionic/angular"
var { Storage } = Plugins
@Component({
  selector: 'app-price',
  templateUrl: './price.page.html',
  styleUrls: ['./price.page.scss'],
})
export class PricePage implements OnInit {
  error
  params = { product: null, item: null, data: null }
  constructor(public nav: NavController, private active: ActivatedRoute) {
    this.active.params.subscribe(params => {
      var { product, item, data } = params
      this.params = { product, item, data }
    })
  }

  ngOnInit() {
  }

  async onClick(value) {
    var { parse, stringify } = JSON
    var { assign } = Object
    this.error = (!value) ? "Can't left this field empty" : null
    if (this.error) return
    this.params.data = stringify(assign(parse(this.params.data), { price: value }))
    var temp = await this.phoneAuth()
    if (!temp) this.nav.navigateForward(["/phone-auth"])
    else this.nav.navigateForward(["/location", { ...this.params }])
  }

  async phoneAuth() {
    var phone = JSON.parse((await Storage.get({ key: "user_data_eshop" })).value)["phoneNumber"]
    if (!phone) {
      return false
    }
    return true
  }
}