import { Injectable } from '@angular/core';
import { FilesystemDirectory, Plugins } from "@capacitor/core"
var { Filesystem } = Plugins
@Injectable({
  providedIn: 'root'
})
export class ImageInLocalStorageService {

  constructor() { }
  async getImage() {
    try {
      var base64 = (await Filesystem.readFile({ path: "profile.txt", directory: FilesystemDirectory.Data })).data
      if (!(/data:image/.test(base64))) return "data:image/jpeg;base64," + base64
      else return base64
    } catch (error) {
      return "assets/person-circle.svg"
    }
  }
}
