import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'
import { firebaseArray } from "./firebase_imports"
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from "@ionic-native/base64/ngx"

import { PhotoViewer } from "@ionic-native/photo-viewer/ngx"
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    firebaseArray,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ImagePicker,
    Base64,
    PhotoViewer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
