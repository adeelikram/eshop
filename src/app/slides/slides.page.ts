import { Component } from '@angular/core';
import { AngularFirestore as AngFire } from "@angular/fire/firestore"
import { IonSlides as is, PopoverController, Platform, AlertController } from '@ionic/angular';


import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { ProgressBarPage } from "./progress-bar/progress-bar.page"
import { ActivatedRoute } from '@angular/router';

import { cfaSignIn, cfaSignOut } from "capacitor-firebase-auth"

var { Storage } = Plugins

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage {

  slideOpts = {
    speed: 500,
    initialSlide: 0
  };
  slider: is

  constructor(

    private nav: NavController,
    private db: AngFire,
    private popover: PopoverController,
    private active: ActivatedRoute,
    public platform: Platform,
    private alertController: AlertController
  ) { }



  delProperty(user) {
    ["uid", "photoURL", "phoneNumber"].forEach(e => delete user.providerData[0][e])
  }
  async google() {
    try {
      cfaSignIn("google.com").subscribe(user => {
        this.delProperty(user)
        this.notificationTokenNative(user.providerData[0])
      })

    } catch (error) {
      alert("Error" +error)
    }
  }
  async facebook() {
    try {
      cfaSignIn("facebook.com").subscribe(user => {
        this.delProperty(user)
        this.notificationTokenNative(user.providerData[0])
      })

    } catch (error) {
      alert(error)
    }
  }
  async twitter() {
    try {
      cfaSignIn("twitter.com").subscribe(user => {
        this.delProperty(user)
        this.notificationTokenNative(user.providerData[0])
      })

    } catch (error) {
      alert(error)
    }
  }

  async notificationTokenNative(data) {  //Native
    (await this.popover.create({ component: ProgressBarPage, animated: true })).present()
    // var push = Plugins.PushNotifications
    // var permission = await push.requestPermission()
    // if (permission.granted) {
    //   push.register().then(() => {
    //     FCMPlugin.subscribeTo({ topic: 'all' }).catch((err) => alert(err))
    //   })
    // }
    // push.addListener("registration", (token) => {
    this.storeInFirestore(data, "token.value")
    // })
    // push.addListener("registrationError", async (err) => {
    //   alert("Something goes wrong! " + JSON.stringify(err))
    //     cfaSignOut().subscribe()
    // })
  }


  async storeInFirestore(user, token) {
    var data = { ...user }
    
    Object.assign(data, { token: token })
    var { email } = data;
    console.log(data) 
    var resp = await this.db.firestore.collection("eshop").doc(email).set(data, { merge: true })
    resp = (await this.db.firestore.collection("eshop").doc(email).get()).data() as any
    await Storage.set({ key: "user_data_eshop", value: JSON.stringify(resp) })
    await Storage.set({ key: "user_of_eshop", value: email })
    try {
      await this.popover.dismiss()
      localStorage.setItem("viewed", "true")
      //** */
      this.nav.back()
      /** */
    } catch (error) {
      (async () => {
        alert("Error occured: " + error)
        cfaSignOut().subscribe()
      })
    }

  }



  //slide functionality
  slidesLoaded(slides) {
    this.slider = slides
    this.slider.lockSwipeToNext(true)
  }
  slideNext() {
    this.slider.lockSwipeToNext(false)
    this.slider.slideNext(500)
    this.slider.lockSwipeToNext(true)
  }


  async close() {
    localStorage.setItem("viewed", "true") // for router guard in app-routing-module 
    this.nav.back()
  }

}

