import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { HomeTabsService } from '../../hide-home-tabs.service';
import { cities, fuel, brands } from "./data.list"
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss']
})
export class VehiclesPage {
  @ViewChild("content") content: IonContent
  hide_toolbar = /bikes/.test(location.href)
  @Output() sendToBikes = new EventEmitter()
  @Input() item
  /*
   Errors Array
   index  Title
    0      brand
    1      year
    2      KMs
    3      register 
    4      fuel 
    5      type 
  */
  errors = []
  input = { brand: '', year: '', kms: '', fuel: '', register: '', type: 'cars' }
  date = new Date()
  objs = [
    { label: 'Year', n: 1 },    //n is error index
    { label: 'KMs Driven', n: 2 }
  ]
  visibility_check = ["Cars", "Buses,Vans & Trucks", "Tractors", "Rickshaw & Chingchi"]
  constructor(
    private active: ActivatedRoute,
    public nav: NavController,
    private homeTabs:HomeTabsService
  ) {
    this.active.params.subscribe(data => {
      if (!this.hide_toolbar) {
        this.item = data["item"];  //if this is bikes page then item attr already set
        this.deleteProps(this.item)
      }
    })
    this.homeTabs.hideHomeTabs()
  }

  ngOnInit() { //when page is used in bikes
    if (this.hide_toolbar) {
      this.deleteProps(this.item)
    }
  }

  get brands() {
    return brands
  }
  get cities() {
    return cities
  }
  get fuel() {
    return fuel
  }

  deleteProps(n) {
    switch (n) {
      case "Cars":
        delete this.input.type
        break
      case "Accessories": case "Other":
        for (var prop in this.input) delete this.input[prop]
        break
      case "Spare Parts":
        for (var prop in this.input) delete this.input[prop]
        this.input.type = 'cars'
        break
      case "Buses,Vans & Trucks": case "Tractors": case "Rickshaw & Chingchi":
        ['brand', 'fuel', 'register', 'type'].forEach(el => delete this.input[el])
        break
    }
  }

  gotData(data) {
    var clear = this.Errors()
    if (!clear || !data) return
    Object.assign(this.input, data)
    if (this.hide_toolbar) {
      this.sendToBikes.emit(this.input)   //same module will used in bikes
      return
    }
    this.nav.navigateForward(["/home/sell/price", { product: "vehicles", item: this.item, data: JSON.stringify(this.input) }])
  }

  Errors() {
    if (this.item == "Cars") {
      let temp = this.Cars()  // checking where to scroll in page
      if (temp[1]) this.content.scrollToPoint(0, 50)          // scroll to point to fuel
      else if (!temp[0]) this.content.scrollToTop()
      return temp[0]
    }
    else if (/Tractors|Buses,Vans|Rickshaw/.test(this.item)) {
      let temp = this.bvt_rc_tracktor()
      if (!temp) {
        this.content.scrollToTop()
        return false
      }
      return true
    }
    return true //for all other cases
  }

  Cars() {
    var { brand, year, kms, fuel, register } = this.input
    var temp = undefined
    if (!brand) temp = { text: "Please Select Your brand", index: 0 }
    else if (this.year(year)) return [false]     //because year error has been displayed by year method
    else if (!kms) temp = { text: "Must enter Kilometers Driven", index: 2 }
    else if (this.checkString(kms, 2)) return [false]   // error already displayed by checkString
    else if (!register) temp = { text: "Please Select Regitration city of Car", index: 3 }
    else if (!fuel) {
      this.errors = []
      this.errors[4] = "Select Fuel of Car"
      return [false, true]   //true for scrolling in middle of the page
    }
    if (temp) {
      this.errors = []
      this.errors[temp.index] = temp.text
      return [false]
    }
    return [true]
  }

  bvt_rc_tracktor() {
    var { kms, year } = this.input
    if (this.year(year)) return false     //because year error has been displayed by year method
    else if (!kms) {
      this.errors = []
      this.errors[2] = "Must enter Kilometers Driven"
      return false
    }
    else if (this.checkString(kms, 2)) return false
    return true
  }

  year(year) {
    this.errors = []
    var temp = String(year)
    var text = undefined
    if (this.checkString(temp, 1)) return true
    else if (!temp || temp.length < 4) text = "Enter 4 digits"
    else if (year < 1920) text = "Enter date more than 1920"
    else if ((new Date().getFullYear()) < year) text = "Value is more than Current Year"
    if (text) {
      this.errors[1] = text
      return true
    }
    return false
  }

  checkString(str, index) {
    var condition = Object.is(Number(str), NaN)
    this.errors[index] = (condition) ? "Numbers Only" : null
    return condition              // condition for year and !condition for kms 
  }
}