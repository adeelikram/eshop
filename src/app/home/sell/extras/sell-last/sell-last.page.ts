import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sell-last',
  templateUrl: './sell-last.page.html',
  styleUrls: ['./sell-last.page.scss'],
})
export class SellLastPage implements OnInit {
  title_error  
  lengths = [0, 0] // title length and describe length
  describe_error
  input = {condition: "new", title: "", describe: "" }
  errors = [
    "please write at least 5 characters",
    "please write at least 50 characters",
  ]
  condition = [
    {
      first: "new",
      last: "New"
    },
    {
      first: "used",
      last: "Used"
    }
  ]
  @Output() getData = new EventEmitter<Object>()
  @Input() hideCondition:boolean
  constructor(private element:ElementRef) {
    this.element.nativeElement.className="notranslate"
   }
  
  ngOnInit() {
    if(this.hideCondition){
      delete this.input.condition
    }
  }
  
  modelChange(event, n) {
    var text = event
    text = text.replace(/\s/g, "")
    var len = text.length
    this.lengths[n] = (len) ? len : 0
  }

  final() {
    var flag = this.checkErrors()
    if (flag) {
       this.getData.emit(this.input) 
    }
    else this.getData.emit(null) // for parent page to validate inputs
  }

  checkErrors() {
    var { title, describe } = this.input
    if (!title || title.length < 5) {
      this.title_error = this.errors[0]
      return false
    }
    else if (!describe || describe.length < 50) {
      this.title_error = ''
      this.describe_error = this.errors[1]
      return false
    }
    else {
      this.title_error = ''
      this.describe_error = ""
      return true
    }
  }
}


