import { Component } from '@angular/core';
import { FilesystemDirectory, Plugins } from "@capacitor/core"

import { AlertController, NavController } from "@ionic/angular"
import { ImageInLocalStorageService } from '../../image-in-local-storage.service';

var { Storage, Filesystem, FCMPlugin } = Plugins

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage {
  image
  animated = false
  hover = false
  registered
  constructor(
    private alertController: AlertController,
    private nav: NavController,
    private imgService: ImageInLocalStorageService
  ) {
    document.addEventListener("profileUploaded",async(ev) => {
      this.image = ev["image"]
    })
    document.addEventListener("registered",()=>{
      this.registered = true
    })
  }

  async ngAfterViewInit() {
    this.image = await this.imgService.getImage()
    var data = (await Storage.get({ key: "user_of_eshop" })).value
    if (!data) {
      this.registered = false
    }
    else {
      this.registered = true
    }
  }

  animate(options) {
    var element: HTMLElement = options.el
    if (!this.hover) {
      element.style.animation = "bottom .5s forwards"
      this.hover = true
    }
    else {
      element.style.animation = "top .5s forwards"
      this.hover = false
    }
    element.onanimationend = (ev) => {
      element.style.animation = element.style.animation.replace("0.5s ease 0s 1 normal", "")
    }
  }

  notification(el) {
    if (el.checked) {
      FCMPlugin.subscribeTo({ topic: 'all' }).catch((err) => alert(err))
    }
    else {
      FCMPlugin.unsubscribeFrom({ topic: 'all' }).catch((err) => console.log(err));
    }
  }

  seeProfile() {
    this.nav.navigateForward(['home/account/profile'])
  }

  async delete() {
    await this.alertAndOperation('Do you want to delete account permanently?')

  }
  async alertAndOperation(msg) {
    const alert = await this.alertController.create({
      subHeader: 'Subtitle',
      message: msg,
      buttons: ["Cancel",
        {
          text: "OK",
          handler: async () => {
            await Storage.remove({ key: "user_of_eshop" })
            await Storage.remove({ key: "user_data_eshop" })
            await Storage.remove({ key: "phone_of_user" })
            localStorage.setItem("viewed", "")
            await Filesystem.deleteFile({ path: "profile.txt", directory: FilesystemDirectory.Data })
            // remove image from app.componenet.ts
            document.dispatchEvent(new Event("profileRemoved"))
            this.registered = false
          }
        }]
    });
    await alert.present();
  }

  privacy() {
    this.nav.navigateForward("/home/account/privacy")
  }

  async login() {
    this.nav.navigateForward("install")
  }
}
