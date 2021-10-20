import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore"
import { AngularFireStorage } from "@angular/fire/storage"
import { Plugins } from '@capacitor/core';
import { AlertController, IonSlides, NavController } from "@ionic/angular"
import { HomeTabsService } from '../hide-home-tabs.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.page.html',
  styleUrls: ['./ads.page.scss'],
})
export class AdsPage {
  // we are using ng templates in ion slides 
  data = []
  hideSpinner = [false, false]
  class = ['d-none', 'd-none']
  // for this purpose data hideSpinner,and class are used are array length 2
  segment = '1'
  @ViewChild("slides") slides: IonSlides

  constructor(
    private db: AngularFirestore,
    private alert: AlertController,
    private storage: AngularFireStorage,
    private nav: NavController,
    private hideHomeTabs: HomeTabsService
  ) {
    //dispatch from add.photo.ts
    document.addEventListener("addUploaded", (event) => {
      this.data = []
      this.hideSpinner = [false, false]
      this.class = ['d-none', 'd-none']
      this.segment = '1'
      this.ngOnInit()
    })
  }

  async ngOnInit() {
    var user = await Plugins.Storage.get({ key: "user_of_eshop" })
    if (!user.value) {
      return this.nextOfGetData("tab")
    }
    this.data[0] = (await this.db.firestore.collection("eshop/" + user.value + "/eshop").orderBy("date", "desc").get()).docs
    this.data[1] = (await this.db.firestore.collection("eshop/" + user.value + "/favorites").orderBy("date", "desc").get()).docs
    this.hideSpinner = [true, true] //hide spinners after getting data
    var array = this.data
    var condition = (!(array[0][0] || array[1][0]) ? "tab" : (!array[0][0]) ? "tab1" : (!array[1][0]) ? "tab2" : null)
    if (!condition) return
    this.nextOfGetData(condition)
  }

  nextOfGetData(str) {
    if (/tab1/.test(str)) { //hideSpinner called here because if user is not registered then hideSpinner in ngOnInit will not called 
      this.hideSpinner[0] = true
      this.class[0] = "d-flex h-100 align-items-center justify-content-center"
    }
    else if (/tab2/.test(str)) {
      this.hideSpinner[1] = true
      this.class[1] = "d-flex h-100 align-items-center justify-content-center"
    }
    else {
      var temp = "d-flex h-100 align-items-center justify-content-center"
      this.hideSpinner = [true, true]
      this.class = [temp, temp]
    }
  }

  changeSlide() { //for segments operation based on current value of segments
    var val = Number(this.segment)
    if (val == 2) this.slides.slideNext()
    else this.slides.slidePrev()
  }

  async slideChanged() { //for slides  when change start
    var temp = await this.slides.getActiveIndex()
    this.segment = String(temp + 1)
  }

  getDate(val: number) {
    return String(new Date(val)).substr(4, 11)
  }

  async trash(event) {
    var alert = this.alert.create({
      subHeader: "Caution",
      message: "Do you want to delete?",
      buttons: [
        "Cancel",
        {
          text: "OK",
          handler: async () => {
            var num = Number(event.target.id)
            var user = await Plugins.Storage.get({ key: "user_of_eshop" })
            var index = await this.slides.getActiveIndex()
            var collection = (index == 0) ? "eshop" : "favorites"
            var array = []
            array[0] = Promise.resolve(this.db.collection("eshop/" + user.value + "/" + collection).doc(this.data[index][num].id).delete())
            if (index == 0) {
              for (var i of this.data[index][num].data().images) {
                var temp = i.search(/%2F\d\d/)
                var temp1 = i.search(/[?]/)
                i = i.substr(temp + 3, temp1 - temp - 3)
                array.push(
                  Promise.resolve(this.storage.ref("eshop/" + user.value + "/" + i).delete())
                )
              }
            }

            Promise.all(array).then(async val => {
              //hide targeted element and check if data array is empty show No Ads msg
              this.data[index].splice(num, 1)
              if (!this.data[index][0]) {
                this.nextOfGetData((index == 0) ? 'tab1' : 'tab2')
              }
            }).catch(error => {
              window.alert("Error while deleting Ad :" + error)
            })
          }
        }
      ]
    })
      ; (await alert).present()
  }

  async passDataToShowAd(i, slide, event) {
    if (/\d/.test(event.target.id)) return //if click on trash button whole item will be clicked so prevent from it 
    var parent, product
    if (/ads/.test(slide)) {
      parent = (await i.ref.parent.parent.get()).data()
      product = i.data()
    }
    else {
      var temp = i.data()
      var { displayName, photoURL, phoneNumber, email } = (await this.db.firestore.doc("eshop/" + temp["email"]).get()).data()
      parent = { displayName, photoURL, phoneNumber, email };
      ["displayName", "photoURL", "phoneNumber", "token"].forEach(el => delete temp[el])
      product = temp
    }
    this.hideHomeTabs.hideHomeTabs()
    this.nav.navigateForward(["home/show-ad", { data: JSON.stringify({ parentData: parent, productData: product }), from: slide, id: i.id }])
  }


  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      location.reload()
    }, 2000);

  }


}

