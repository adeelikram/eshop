import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HomeTabsService } from '../../hide-home-tabs.service';
import { list } from './data.list';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {
  item
  types
  errors = []
  input = { type: null }
  constructor(private nav: NavController, private active: ActivatedRoute,private homeTabs:HomeTabsService) {
    this.active.params.subscribe(data => {
      this.item = data["item"]
    })
    this.types = list
    this.homeTabs.hideHomeTabs()
  }

  ngOnInit() {

  }

  Errors(data) {
    if (/Books & Magazines/.test(this.item)) {
      var { type } = this.input
      if (!type) {
        this.errors[0] = `Please Select your book type`
        return false
      }
      else {
        this.errors = []
        Object.assign(this.input, data)
        return true
      }
    }
    return true
  }

  gotData(data) {
    var temp = this.Errors(data)
    if (!data || !temp) return
    this.nav.navigateForward(['/home/sell/price', { product: "Books & Sports", item: this.item, data: JSON.stringify(this.input) }])
  }
}
