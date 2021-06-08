import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from "@ionic/angular"
import { Plugins } from "@capacitor/core"
var { Geolocation } = Plugins
declare var google
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  address
  service = new google.maps.places.AutocompleteService();
  places = []
  params
  constructor(public nav: NavController, private active: ActivatedRoute) {
    this.active.params.subscribe(params => {
      var { product, item, data } = params
      this.params = { product, item, data }
    })
  }


  ngOnInit() {
    this.currentLocation()
  }


  onSearchChange(event) {
    var self = this
    if(!event.target.value) return
    function map(predictions, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert("Internet connectivity error");
        return;
      }
      self.places = predictions
    }
    this.service.getQueryPredictions({ input: event.target.value }, map);
  }

  async currentLocation() {
    try {
      var res = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 5000 })
      var { latitude, longitude } = res.coords
      var geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results) => {
        this.address = results[0].formatted_address
      })  
    } catch (error) {
      alert("Error in accesing your location")
    }
    
  }

  gotData(data) {
    this.params.data = JSON.parse(this.params.data)
    Object.assign(this.params.data, { location: data })
    this.params.data = JSON.stringify(this.params.data)
    this.nav.navigateForward(["home/sell/add-photos", { ...this.params }])
  }
}
