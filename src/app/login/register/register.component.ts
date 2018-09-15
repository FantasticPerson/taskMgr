import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  items:string[]

  constructor() { }

  ngOnInit() {
    let names = []
    for(let i=1;i<=16;i++){
      names.push(`avatars:svg-${i}`)
    }
    this.items = names
  }

}
