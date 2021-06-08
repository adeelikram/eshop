import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImageInLocalStorageService } from '../image-in-local-storage.service';
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
  ]
  constructor(
    private router: Router,
    private imgService: ImageInLocalStorageService
  ) {
    this.path = this.router.url.split("home/").pop()
    //this.hideHomeTabs.currentMessage.subscribe(data => this.hide_nav = data)
    document.addEventListener("hometabs", (ev) => this.hide_nav = ev["value"])
    document.addEventListener("profileUploaded", (ev) => {
      this.img_source = ev["image"]
    })
    document.addEventListener("profileRemoved", (ev) => {
      this.img_source = ev["image"]
    })
  }

  async ngOnInit() {
    var id = document.getElementById(this.path)
    id.className = `bg-primary ${id.className}`
    this.setImage()
  }
  ngAfterViewInit() {
    setTimeout(() => {
      new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL }, 'google_translate_element');
    }, 3000)
  }
  changeColor(array) {
    array[0].el.className = `bg-primary ${array[0].el.className}`
    for (var i = 1; i < 5; i++) {
      array[i].el.className = array[i].el.className.replace("bg-primary", "")
    }
  }
  async setImage() {
    //image service set image from localStorage or person-circle.svg
    this.img_source = await this.imgService.getImage()
  }
}
