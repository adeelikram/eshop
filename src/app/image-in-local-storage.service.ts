import { Injectable } from '@angular/core';
import { Plugins } from "@capacitor/core"
var { Storage } = Plugins
@Injectable({
  providedIn: 'root'
})
export class ImageInLocalStorageService {

  constructor() { }
  async getImage() {
    var imageUrl = JSON.parse((await Storage.get({ key: "user_data_eshop" })).value)["photoURL"]
    if (imageUrl) return imageUrl
    else return "assets/person-circle.svg"
  }
}
