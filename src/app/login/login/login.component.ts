import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators, FormBuilder } from '@angular/forms'
import { QuoteService } from '../../servives/quote.service';
import { Quote } from '../../domain/quote.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  quote: Quote = {
    "cn": "我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合,可是背上总是有无数闪亮的银色丝线,操纵我哪怕一举手一投足。",
    "en": "I suddenly feel myself like a doll,acting all kinds of joys and sorrows.There are lots of shining silvery thread on my back,controlling all my action.",
    "pic": "/assets/img/quotes/0.jpg"
  }
  constructor(private fb: FormBuilder, private quoteService$: QuoteService) {
    // debugger
    this.quoteService$.getQuote().subscribe(q => this.quote = q)
    // this.form = this.fb.group({
    //   email: new FormControl('wang@163.com', Validators.compose([
    //     Validators.required,
    //     Validators.email
    //   ])),
    //   password: new FormControl('',Validators.required)
    // })
    // this.form = new FormGroup({
    //   email: new FormControl('wang@163.com', Validators.compose([
    //     Validators.required,
    //     Validators.email
    //   ])),
    //   password: new FormControl('',Validators.required)
    // })
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['wang@163.com', Validators.compose([
        Validators.required,
        Validators.email,
        this.validate
      ])],
      password: ['', Validators.required]
    })
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault()
    console.log(value)
    console.log(valid)

    // this.form.controls['email'].setAsyncValidators(this.validate)  动态验证
  }


  validate(c: FormControl): { [key: string]: any } {
    if (!c.value) {
      return null
    }
    const pattern = /^wang+/
    if (pattern.test(c.value)) {
      return null
    }
    return {
      emailNotValid: 'email invalid'
    }
  }
}
