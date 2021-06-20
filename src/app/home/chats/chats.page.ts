import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { HomeTabsService } from '../hide-home-tabs.service';
import { Plugins } from "@capacitor/core"
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { NavController } from '@ionic/angular';

const { Storage } = Plugins

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage {
  material = []
  self = ""
  hideSpin=false
  constructor(private db: AngularFireDatabase, private homeTabs: HomeTabsService, private nav: NavController) {

  }

  async ngOnInit() {
    this.self = this.hash((await Storage.get({ key: "user_of_eshop" })).value)
    this.db.database.ref("eshop").on("child_added", (res) => {
      this.hideSpin=true
      this.processDB(res)
    })
  }

  processDB(data: DataSnapshot) {
    if (data.key.includes(this.self)) {
      var tmp = data.val()
      var keys = Object.keys(tmp)
      this.material.push({ docId: data.key, ...tmp[keys[keys.length - 2]] })
    }
  }

  convertDate(date) {
    var tmp = (new Date(date - 20000000)).toString().substr(4, 17)
    var index = tmp.lastIndexOf(" ")
    var again = Number(tmp.substr(index, tmp.indexOf(":")).split(":")[0])
    var num = (again > 12) ? again % 12 : again
    var perm = (again > 12) ? "PM" : "AM"
    tmp = tmp.replace(" " + again + ":", " " + num + ":")
    tmp += " " + perm
    return tmp
  }

  ionViewWillEnter() {
    this.homeTabs.showHomeTabs()
  }
  hash(email: string) {
    var len = email.length
    var hash = ""
    for (let i = 0; i < len; i++) {
      hash += email.charCodeAt(i) + ((i != len - 1) ? "-" : "")
    }
    return hash
  }

  doChats(el) {
    this.nav.navigateForward(["/home/chats/do-chat", { displayName: el.displayName, email: el.email, photoURL: el.photoURL, docId: el.docId }])
  }

  doRefresh(event) {
    setTimeout(() => {
      location.reload()
      event.target.complete();
    }, 2000);
  }
}
