import { Component, ViewChild } from '@angular/core';
import { HomeTabsService } from '../../hide-home-tabs.service';
import { AngularFireDatabase } from "@angular/fire/database"
import { ActivatedRoute } from '@angular/router';
import { io } from "socket.io-client"
import { Plugins } from "@capacitor/core"
var { Storage } = Plugins
@Component({
  selector: 'app-do-chat',
  templateUrl: './do-chat.page.html',
  styleUrls: ['./do-chat.page.scss'],
})
export class DoChatPage {
  messages = []
  person = { displayName: "", photoURL: "", email: "" }
  docId = ""
  status = "offline"
  socket = io("https://eshop-socket.herokuapp.com")
  me = ""
  type_timeout
  ourData
  @ViewChild("view") view
  constructor(
    private homeTabs: HomeTabsService,
    private db: AngularFireDatabase,
    private route: ActivatedRoute
  ) {
    this.person.displayName = this.route.snapshot.paramMap.get("displayName")
    this.person.email = this.route.snapshot.paramMap.get("email")
    this.person.photoURL = this.route.snapshot.paramMap.get("photoURL")
    if (!this.person.photoURL) this.person.photoURL = "assets/person-circle.svg"
    this.docId = this.route.snapshot.paramMap.get("docId")
    this.homeTabs.hideHomeTabs()

  }

  async ngOnInit() {
    var data = JSON.parse((await Storage.get({ key: "user_data_eshop" })).value)
    this.me = data["email"]
    var { email, displayName, photoURL } = data
    this.ourData = { email, displayName, photoURL:(photoURL)?photoURL:"assets/person-circle.svg" }
    this.socketOperations()
  }

  async socketOperations() {
    this.socket.on("typer", (user) => {
      if (this.person.email != user.user) return
      this.status = "Typing..."
    })
    this.socket.on("receiverOnline", (user) => {
      if (this.person.email != user.user) return
      this.socket.emit("i_am_also", { user: this.me })
      this.status = "Online"
    })
    this.socket.on("stopped", (user) => {
      if (this.person.email != user.user) return
      this.status = "Online"
    })

    this.socket.on("ok", (user) => {
      if (this.person.email != user.user) return
      this.status = "Online"
    })

    this.socket.on("gone", (user) => {
      if (user.user != this.person.email) return
      this.status = "Offline"
    })
  }

  hash(email: string) { //becauase we can't use email as doc ids as because they contain "."
    var len = email.length
    var hash = ""
    for (let i = 0; i < len; i++) {
      hash += email.charCodeAt(i) + ((i != len - 1) ? "-" : "")
    }
    return hash
  }

  async getDocId() {
    if (!this.docId) {
      var str = this.hash(this.person.email)
      var str2 = this.hash(JSON.parse((await Storage.get({ key: "user_data_eshop" })).value)["email"])
      var doc = await this.db.database.ref(`eshop/${str}_${str2}`).get()
      if (!doc.exists()) doc = await this.db.database.ref(`eshop/${str2}_${str}`).get()
      if (!doc.exists()) {
        await this.db.database.ref(`eshop/${str}_${str2}`).set({ start: true })
        doc = str + "_" + str2 as any
      }
      return (typeof doc == "object") ? doc.key : doc
    }
    else {
      return this.docId
    }
  }
  async ngAfterViewInit() {
    var t
    this.db.database.ref(`eshop/${await this.getDocId()}`).on("child_added", async (data) => {
      if (data.key == "start") return
      this.messages.push(data.val())
      clearTimeout(t)
      t = setTimeout(() => {
        this.view.nativeElement.scrollIntoView()
      }, 500)
    })

  }

  ionViewWillEnter() {
    this.socket.emit("online", { user: this.me })
    this.homeTabs.hideHomeTabs()
  }

  ionViewWillLeave() {
    this.socket.emit("going", { user: this.me })
  }

  async sendMessage(input) {
    if (!input.value) return
    try {
      await this.db.database.ref(`eshop/${await this.getDocId()}`).push({ date: Date.now(), msg: input.value, ...this.ourData })
      input.value = ""
      this.view.nativeElement.scrollIntoView()
    } catch (error) {
      alert(error)
    }

  }

  textChange() {
    this.socket.emit("typing", { user: this.me })
    clearTimeout(this.type_timeout)
    this.type_timeout = setTimeout(() => {
      this.socket.emit("stopping", { user: this.me })
    }, 2000)
  }

  convertDate(n: number) {
    var tmp = (new Date(n)).toString().substr(4, 17)
    var index = tmp.lastIndexOf(" ")
    var again = Number(tmp.substr(index, tmp.indexOf(":")).split(":")[0])
    var num = (again > 12) ? again % 12 : again
    var perm = (again > 12) ? "PM" : "AM"
    tmp = tmp.replace(" " + again + ":", " " + num + ":")
    tmp += " " + perm
    return tmp
  }

}
