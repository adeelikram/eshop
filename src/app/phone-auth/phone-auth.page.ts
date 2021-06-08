import { Component, OnInit } from '@angular/core';
import { auth } from "firebaseui"
import firebase from "firebase"
import { NavController, PopoverController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth"
import { Plugins } from "@capacitor/core"

var { Storage } = Plugins
@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.page.html',
  styleUrls: ['./phone-auth.page.scss'],
})
export class PhoneAuthPage implements OnInit {


  constructor(
    private nav: NavController,
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    private pop: PopoverController
  ) {

  }

  ngOnInit() {
    var arr = Promise.resolve(this.afa.setPersistence("local"))
    Promise.all([arr])
    var config = {
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: "PK",
        }
      ],
      callbacks: {
        signInSuccessWithAuthResult: (res, url) => {
          Storage.get({ key: "user_of_eshop" }).then(async user => {
            //set storage values like phone_of_user and value of user_data_eshop 
            var sample = await this.afs.collection("eshop").doc(user.value).update({ phoneNumber: res.user.phoneNumber })
            var data = (await Storage.get({ key: "user_data_eshop" })).value
            data = (JSON.parse(data))
            data["phoneNumber"] = res.user.phoneNumber
            //dispatch event for profile page phone number value
            var event=new Event("phoneUpdated")
            event["value"]=res.user.phoneNumber
            document.dispatchEvent(event)
            //update user data eshop phone number
            await Storage.set({ key: "user_data_eshop", value: JSON.stringify(data) })
            //await this.pop.dismiss().catch(error => { })            // because after phone authentication there is extras/progress-bar popover
            this.nav.pop()

          })
          return false;
        },
      }
    }
    if (auth.AuthUI.getInstance()) {
      auth.AuthUI.getInstance().start("#phoneAuth", config)
    }

    else new auth.AuthUI(firebase.auth())
      .start("#phoneAuth", config)

  }


}
