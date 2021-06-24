import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Plugins, } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { HomeTabsService } from "../../hide-home-tabs.service"
import { ImageInLocalStorageService } from "../../../image-in-local-storage.service"

import firebase from 'firebase';
var { sms, call, Toast } = Plugins;
declare var google
@Component({
  selector: 'app-show-ad',
  templateUrl: './show-ad.page.html',
  styleUrls: ['./show-ad.page.scss'],
})
export class ShowAdPage {
  product;
  parent;
  userP = { title: "", describe: "", image: "" }
  from
  fav_icon = "heart-outline"
  forUserView
  user
  hideFav = false
  id
  constructor(
    private active: ActivatedRoute,
    private db: AngularFirestore,
    private homeTabs: HomeTabsService,
    private nav: NavController,
    private imgService: ImageInLocalStorageService
  ) {

    var { parentData, productData } = JSON.parse(this.active.snapshot.paramMap.get("data"))
    this.userP.title = productData.data.title
    this.userP.describe = productData.data.describe
    this.parent = parentData
    this.product = productData
    var prod = productData["product"]
    var item = productData["item"]
    this.id = this.active.snapshot.paramMap.get("id")
    this.forUserView = { ...this.product.data, product: prod, item: item }
    this.from = this.active.snapshot.paramMap.get("from");
    ["title", "describe",].forEach(el => delete this.forUserView[el])

  }

  ionViewWillLeave() {
    this.homeTabs.showHomeTabs()
  }

  async ngOnInit() {
    this.user = (await Plugins.Storage.get({ key: 'user_of_eshop' })).value
    var temp = (this.user) ? (await this.db.firestore.collection("eshop/" + this.user + "/favorites").where("id", "==", this.id).get()).docs : [null]
    this.fav_icon = (temp[0]) ? "heart" : "heart-outline"
    if (this.parent["email"] != this.user) {
      await this.db.firestore.collection("eshop/" + this.parent["email"] + "/eshop").doc(this.id).update({ views: firebase.firestore.FieldValue.increment(1) })
    }
  }


  async ngAfterViewInit() {
    if (/ads/.test(this.from)) {
      this.userP.image = await this.imgService.getImage()
      document.querySelector('#footer')['style'].display = 'none'
    }
    else {
      this.userP.image = this.parent["photoURL"] ? this.parent["photoURL"] : "assets/person-circle.svg"
      this.hideFav = (this.from == "explore") ? false : true
      document.querySelector('#footer')['style'].display = 'block'
    }
    this.map()
  }

  async Fav() {
    if (!this.user) {
      alert("You have to SignIn first in order to save in your favorites gallery.")
      return
    }
    var collectionRef = this.db.firestore.collection("eshop/" + this.user + "/favorites")
    if (/heart-outline/.test(this.fav_icon)) {
      await collectionRef.add({
        email: this.parent["email"], ...this.product, id: this.id
      })
      this.fav_icon = "heart"
      await this.db.firestore.collection("eshop/" + this.parent["email"] + "/eshop").doc(this.id).update({ likes: firebase.firestore.FieldValue.increment(1) })
      await Toast.show({ text: "Added to Favorites", position: "center" })
    }
    else {
      var temp = (await collectionRef.where("id", "==", "" + this.id).get()).docs
      await temp[0].ref.delete()
      await this.db.firestore.collection("eshop/" + this.parent["email"] + "/eshop").doc(this.id).update({ likes: firebase.firestore.FieldValue.increment(-1) })
      await Toast.show({ text: "Removed from Favorites", position: "center" })
      this.fav_icon = "heart-outline"
    }

  }

  map() {
    var map = document.getElementById("map")
    new google.maps.Geocoder().geocode({ address: String(this.product.data.location) }, (res, stat) => {
      var { location } = res[0].geometry
      var madeMap = new google.maps.Map(map, {
        zoom: 8,
        center: { lat: location.lat(), lng: location.lng() }
      })

      new google.maps.Marker({
        position: { lat: location.lat(), lng: location.lng() },
        map: madeMap,
        title: "Location"
      })
    })

  }


  sendSMS() {
    try {
      sms.send({
        number: this.parent["phoneNumber"],
        text: "Hello " + this.parent["displayName"] + "!\n"
      })
    }
    catch (error) {
      alert("Error:" + error)
    }

  }

  async chat() {
    if (this.parent.email == this.user) alert("You created this post.\nSo you can't chat with yourself")
    else this.nav.navigateForward(['home/chats/do-chat', { ...this.parent }])
  }

  makeCall() {
    try {
      call.makeCall({ number: this.parent["phoneNumber"] })
    }
    catch (error) {
      alert("Error:" + error)
    }

  }

  items() {
    return Object.keys(this.forUserView)
  }
}