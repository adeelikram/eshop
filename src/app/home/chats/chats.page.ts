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
  self = { email: "", hash: "" }
  hideSpin = false
  empty: any
  icon = true
  del_time: any
  deny_list: any
  constructor(private db: AngularFireDatabase, private homeTabs: HomeTabsService, private nav: NavController) {
  }

  async ngOnInit() {
    this.self.email = (await Storage.get({ key: "user_of_eshop" })).value
    this.self.hash = this.hash(this.self.email)
    var store = (await Storage.get({ key: "eshop_chats_deny" })).value
    this.deny_list = (store) ? JSON.parse(store) : []
    this.db.database.ref("eshop").on("child_added", (res) => {
      this.hideSpin = true
      clearTimeout(this.empty)
      this.processDB(res)
    })
    this.empty = setTimeout(() => {
      this.hideSpin = true
    }, 4000)
  }

  async ngAfterViewInit() {
    document.getElementById("list").addEventListener("DOMNodeInserted", (ev) => {
      ev.target.addEventListener("click", (ev) => {
        if (!this.icon) ev.stopImmediatePropagation()
      }, true)
      ev.target.addEventListener("mouseup", () => {
        clearTimeout(this.del_time)
      })
      ev.target.addEventListener("mousedown", (ev) => {
        if (!this.icon) ev.target["parentElement"]["parentElement"].color = "success"
        else this.del_time = setTimeout(() => {
          ev.target.removeEventListener("click", () => { })
          this.icon = false
          ev.target["parentElement"]["parentElement"].color = "success"
        }, 500)
      })
    })
  }

  processDB(data: DataSnapshot) {
    // data is chat id with email charcodes 
    if (this.deny_list.includes(data.key)) return
    if (data.key.includes(this.self.hash)) {
      // tmp is message object including msg,displayName,email,photoURL
      var tmp = data.val()
      var keys = Object.keys(tmp)
      if (keys[0] == "start") return
      // picking last message from chat
      var choosen = null
      for (let i = keys.length - 2; i >= 0; i--) {
        if (tmp[keys[i]]["email"] != this.self.email) {
          choosen = tmp[keys[i]]
        }
      }
      this.material.push({ docId: data.key, ...choosen })
      this.material.sort((a, b) => Number(b.date) - Number(a.date))
    }

  }

  convertDate(date) {
    var tmp = (new Date(date)).toString().substr(4, 17)
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

  async delete() {
    var array = document.querySelectorAll(".chats")
    for (let el of array[Symbol.iterator]()) {
      if (!el["color"]) continue
      let index = this.material.findIndex(val => val.docId == el.id)
      this.material.splice(index, 1)
      this.deny_list.push(el.id)
      await Storage.set({ key: "eshop_chats_deny", value: JSON.stringify(this.deny_list) })
    }
  }

  revert() {
    this.icon = true
    
    var array = document.querySelectorAll(".chats")
    for (let el of array[Symbol.iterator]()) {
      if (!el["color"]) continue
      el["color"] = undefined
    }
  }

  doRefresh(event) {
    setTimeout(() => {
      location.reload()
      event.target.complete();
    }, 2000);
  }
}
