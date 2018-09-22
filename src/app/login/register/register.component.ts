import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  items: string[]
  form: FormGroup
  private readonly avatarName = 'avatars'
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`
    let names = []
    for (let i = 1; i <= 16; i++) {
      names.push(`avatars:svg-${i}`)
    }
    this.items = names

    this.form = this.fb.group({
      email: [],
      name: [],
      password: [],
      passwordRepeat: [],
      avatar: [img],
      dateOfBirth:['1990-01-01']
    })
  }

  onSubmit({value,valid},ev:Event){
    ev.preventDefault()
    if(!valid){
      return
    }
    console.log(value)
  }

}
