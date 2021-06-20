import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { LoadingController, NavController } from "@ionic/angular"
import { AngularFirestore } from "@angular/fire/firestore"
import { AngularFireStorage } from "@angular/fire/storage"
import { ActivatedRoute } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from "@ionic-native/base64/ngx"
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx"
import { HomeTabsService } from '../../hide-home-tabs.service';
const { Storage } = Plugins
@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.page.html',
  styleUrls: ['./add-photos.page.scss'],
})
export class AddPhotosPage implements OnInit {
  images = []
  img_paths = []
  params = { product: "", item: "", data: "" }
  refs = []  //references to images

  constructor(
    private fire: AngularFirestore,
    private loading: LoadingController,
    private storage: AngularFireStorage,
    private active: ActivatedRoute,
    private nav: NavController,
    private picker: ImagePicker,
    private base64: Base64,
    private photo: PhotoViewer,
    private homeTabs: HomeTabsService
  ) {
    this.active.params.subscribe(params => {
      var { product, item, data } = params
      data = JSON.parse(data)
      this.params = { product, item, data }
    })
  }

  async ngOnInit() {
  }

  takePhoto() {
    this.picker.getPictures({maximumImagesCount:3-this.images.length}).then(async res=>{
      var len=res.length
      this.img_paths.push(...res)  
      for(var i=0;i<len;i++){
        var base64 = await this.base64.encodeFile(res[i])
        this.images.push(base64)
      }
    })
    .catch(err=>{
      alert(err)
    })
  }

  preview(img) {
    this.photo.show(this.img_paths[this.images.indexOf(img)])
  }
  // delete choosen photos  from array 
  reduceArray(i) {
    var index = this.images.indexOf(i)
    this.images.splice(index, 1)
  }

  async submitData() {
    this.fireStorage().catch(async error => {
      alert("Error occured while uploading Images:" + error)
      await this.loading.dismiss()
    })
  }

  async fireStorage() {
    (await this.loading.create({ cssClass: ["loading"], backdropDismiss: false })).present()
    var user = (await Storage.get({ key: "user_of_eshop" })).value
    var array = []
    this.images.map(el => {
      array.push(
        Promise.resolve(this.storage.ref("eshop/" + user + "/" + Date.now()).putString(el, "data_url"))
      )
    })
    var temp = await Promise.all(array)
    array = []
    temp.map(el => {
      array.push(
        Promise.resolve(this.storage.storage.refFromURL(String(el.ref)).getDownloadURL())
      )
    })
    var temp = await Promise.all(array)
    temp.map(el => {
      this.refs.push(el)
    })
    Object.assign(this.params, { images: this.refs, date: Date.now(), views: 0, likes: 0 })
    await this.fire.doc("eshop/" + user).collection("eshop").add(this.params)
    await this.loading.dismiss()
    this.homeTabs.showHomeTabs()
    document.dispatchEvent(new Event("addUploaded"))   // update ads in home/ads
    this.nav.navigateForward(["home/ads"])
  }
}

