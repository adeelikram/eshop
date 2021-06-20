import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HomeTabsService {
  
  event=new Event("hometabs")
  
  constructor(private menuController: MenuController) { }
  // menu will also be disbaled in sub pages 
  hideHomeTabs() {
    this.event["value"] = true
    document.dispatchEvent(this.event)
    this.menuController.enable(false)
  }
  showHomeTabs() {
    this.event["value"] = false
    document.dispatchEvent(this.event)
    this.menuController.enable(true)
  }
}
