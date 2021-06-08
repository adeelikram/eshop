
import { Component, NgZone, ViewChild } from '@angular/core';

import { Platform, IonRouterOutlet, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ImageInLocalStorageService } from "./image-in-local-storage.service"
import { FilesystemDirectory, FilesystemEncoding, Plugins } from "@capacitor/core"



const { App, Storage, Filesystem, Toast } = Plugins
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  @ViewChild(IonRouterOutlet, { static: true }) routerlet: IonRouterOutlet

  slug = undefined
  user


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nav: NavController,
    private zone: NgZone
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
    App.addListener('appUrlOpen', (data: any) => {
      this.zone.run(() => {
        this.slug = data.url.split(".app/").pop();
        if (this.slug) {
          this.nav.navigateForward(this.slug);
        }
      });
    });
  }

  async ngOnInit() {
    this.notification()
    //android back button event
    this.backButton()
    var temp = localStorage.getItem("viewed")
    if (!temp) this.nav.navigateForward("install")
  }





  notification() {
    var push = Plugins.PushNotifications
    push.addListener("pushNotificationReceived", async payload => {
      Toast.show({ text: "Notification recevied", duration: "short" })
    })
  }

  backButton() {
    this.platform.backButton.subscribeWithPriority(-1, async (event) => {
      if (!this.routerlet.canGoBack()) {
        var res = await Plugins.Modals.confirm({
          message: "Do you want to Exit App ?",
          okButtonTitle: "OK",
          cancelButtonTitle: "CANCEL",
          title: "Get At Home"
        })
        if (res.value) {
          navigator["app"].exitApp()
        }
      }
    })
  }


}