import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  doRefresh(event) {
    setTimeout(() => {
      location.reload()
      event.target.complete();
    }, 2000);
  }
}
