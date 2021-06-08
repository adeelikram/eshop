import { AngularFireModule } from "@angular/fire"
import { AngularFireAuthModule } from "@angular/fire/auth"
import { AngularFirestoreModule } from "@angular/fire/firestore"
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireMessagingModule } from "@angular/fire/messaging"
export var firebaseConfig = {
    apiKey: "AIzaSyDfVjAamPJLDio8uaH_6eiojZNBFgJrf_k",
    authDomain: "eshp00.firebaseapp.com",
    databaseURL: "https://eshp00.firebaseio.com",
    projectId: "eshp00",
    storageBucket: "eshp00.appspot.com",
    messagingSenderId: "246921552064",
    appId: "1:246921552064:web:3bff7adc1d87aea5e14d25",
    measurementId: "G-EJQBYG8FSE"
};
export var firebaseArray = [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireMessagingModule
]