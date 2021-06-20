import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, PopoverController } from "@ionic/angular"
import { HomeTabsService } from '../../hide-home-tabs.service';
import { CameraResultType, Plugins } from "@capacitor/core"
import { NameModelPage } from './name-model/name-model.page';
import { ImageInLocalStorageService } from '../../../image-in-local-storage.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
var { Storage, Camera } = Plugins
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  //data for modeling user data and copy to compare if user does't cofirm changes
  data
  copy
  image
  fabicolor = "danger"
  verified_by = ""
  constructor(
    private homeTabs: HomeTabsService,
    public nav: NavController,
    private popoverController: PopoverController,
    private imgService: ImageInLocalStorageService,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private loadingController: LoadingController
  ) {
    this.homeTabs.hideHomeTabs()
    document.addEventListener("phoneUpdated", ev => {
      this.data["phoneNumber"] = ev["value"]
    })
  }

  async ngOnInit() {
    this.data = JSON.parse((await Storage.get({ key: "user_data_eshop" })).value)
    this.copy = this.data["displayName"]
    if (!this.data["phoneNumber"]) {
      this.data["phoneNumber"] = "Register Phone Number"
    }
    this.image = await this.imgService.getImage()
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: NameModelPage,
      translucent: false,
      mode: "md"
    });
    await popover.present();
    var data = await popover.onDidDismiss()
    if (data.data) this.data["displayName"] = data.data
    console.log(data)
  }

  ionViewWillLeave() {
    // it can go only phone-auth page or account
    this.homeTabs.showHomeTabs()
  }
  goback() {
    this.nav.pop()
  }
  //set fab button icon checkmark onclick name input 



  objKeys() {
    return Object.keys(this.data)
  }

  checkValue() {
    if (!this.data["displayName"]) {
      this.data["displayName"] = this.copy
    }

  }
  async selectImage() {
    var img = await Camera.getPhoto({ resultType: CameraResultType.DataUrl })
    var event = new Event("profileUploaded")
    event["image"] = img.dataUrl
    document.dispatchEvent(event);
    await (await this.loadingController.create({})).present()
    /**/
    var user = (await Storage.get({ key: "user_of_eshop" })).value
    var data = JSON.parse((await Storage.get({ key: "user_data_eshop" })).value)
    /** */
    await this.removeImageFromCloud(data["photoURL"], user)
    /** */
    var res = await this.storage.ref("eshop/" + user + "/profile/" + Date.now()).putString(img.dataUrl, "data_url")
    var url = await this.storage.storage.refFromURL(res.ref.toString()).getDownloadURL()

    /** */
    data["photoURL"] = url

    await Storage.set({ key: "user_data_eshop", value: JSON.stringify(data) })
    await this.firestore.doc("eshop/" + user).update({ photoURL: url })
    await this.loadingController.dismiss()
    this.image = img.dataUrl
  }

  async removeImageFromCloud(url, user) {
    if (!url) return
    var temp = url.search(/%2F\d\d/)
    var temp1 = url.search(/[?]/)
    var file = url.substr(temp + 3, temp1 - temp - 3)
    await Promise.resolve(this.storage.ref("eshop/" + user + "/profile/" + file).delete())
  }
}
