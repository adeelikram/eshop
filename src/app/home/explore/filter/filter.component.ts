import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() { }
  dismiss(from, to, date) {
    this.popoverController.dismiss({ from: from, to: to, date: date })
  }

}
