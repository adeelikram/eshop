import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Plugins } from '@capacitor/core';
import { LoadingController, PopoverController } from '@ionic/angular';
var { Storage } = Plugins
@Component({
  selector: 'app-name-model',
  templateUrl: './name-model.page.html',
  styleUrls: ['./name-model.page.scss'],
})
export class NameModelPage implements OnInit {
  name
  constructor
    (
      private popoverController: PopoverController,
      private firestore: AngularFirestore,
      private loadingController: LoadingController
    ) { }

  ngOnInit() {

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 1000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

  async sendValue() {

    await this.presentLoading()
    var email = (await Storage.get({ key: "user_of_eshop" })).value
    await this.firestore.doc("eshop/" + email).update({ displayName: this.name })
    var data = (await Storage.get({ key: "user_data_eshop" })).value
    data = JSON.parse(data)
    data["displayName"] = this.name
    await Storage.set({ key: "user_data_eshop", value: JSON.stringify(data) })
    await this.popoverController.dismiss(this.name)

  }
}
