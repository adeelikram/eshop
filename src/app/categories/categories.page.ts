import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { list } from "./data.list"
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  from
  get list() {
    return list
  }

  constructor(
    public nav: NavController,
    private active: ActivatedRoute
  ) {
    this.from = this.active.snapshot.paramMap.get("from")
  }

  ngOnInit() {
  }

  async moreCategories(text) {
    text = text.split(" ")[0].toLowerCase()
    if (/sell/.test(this.from)) {
      var user = await Plugins.Storage.get({ key: "user_of_eshop" })
      if (!user.value) {
        this.nav.navigateForward(["install"])
      }
    }
    this.nav.navigateForward(['/home/expand-cate', { from: this.from, product: text }])
  }
}
