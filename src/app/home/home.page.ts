import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ImageInLocalStorageService } from '../image-in-local-storage.service';
import { filter } from 'rxjs/operators';
declare var google
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {
  path: string
  hide_nav
  img_source
  @ViewChild("explore") explore
  @ViewChild("chats") chats
  @ViewChild("sell") sell
  @ViewChild("ads") ads
  @ViewChild("account") account
  array = []
  menu_src = [
    {
      src: "assets/icon/shopping_cart.svg",
      title: "Sell & Purchase"
    },
    {
      src: "assets/icon/feedback.svg",
      title: "FeedBack"
    },
    {
      src: "assets/icon/contact.svg",
      title: "Contact Us"
    },

    {
      name: "information-circle-outline",
      title: "About"
    },
    {
      name: "share-social-outline",
      title: "Share"
    },
    {
      name: "analytics-outline",
      title: "Version"
    },
  ];

  constructor(
    private router: Router,
    private imgService: ImageInLocalStorageService
  ) {
    document.addEventListener("hometabs", (ev) => this.hide_nav = ev["value"])
    document.addEventListener("profileUploaded", (ev) => {
      this.img_source = ev["image"]
    })
    document.addEventListener("profileRemoved", (ev) => {
      this.img_source = ev["image"]
    })
  }

  async ngOnInit() {
    this.setImage()
  }

  setCurrentTab() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
    ).subscribe(event => {
      if (event["url"].match(/home\/[a-z]+$/g)) {
        var temp = [...this.array]
        let choice = event["url"].split("/")[2]

        if (choice == "explore") {
          this.explore.el.firstChild.name = "home"
          this.further(temp, 0)
        }
        else if (choice == "chats") {
          this.chats.el.firstChild.name = "chatbox"
          this.further(temp, 1)
        }
        else if (choice == "sell") {
          this.sell.el.firstChild.name = "cart"
          this.further(temp, 2)
        }
        else if (choice == "ads") {
          this.ads.el.firstChild.name = "pricetag"
          this.further(temp, 3)
        }
        else if (choice == "account") {
          this.account.el.firstChild.name = "person"
          this.further(temp, 4)
        }
      }
    });
  }

  further(array, index: number) {
    array.splice(index, 1)
    for (let el of array) {
      if (el.el.firstChild.name.includes("outline")) continue
      el.el.firstChild.name = el.el.firstChild.name + "-outline"

    }
  }
  ngAfterViewInit() {
    this.array = [this.explore, this.chats, this.sell, this.ads, this.account]
    this.setCurrentTab()
    setTimeout(() => {
      new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL }, 'google_translate_element');
    }, 3000)
  }
  async setImage() {
    
    //image service set image from localStorage or person-circle.svg
    this.img_source = await this.imgService.getImage()
  }
}
