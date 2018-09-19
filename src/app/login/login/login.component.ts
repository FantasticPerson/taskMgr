import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators, FormBuilder } from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  constructor(private fb:FormBuilder) {
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
      password: ['',Validators.required]
    })
  }

  onSubmit({value,valid},ev:Event){
    ev.preventDefault()
    console.log(value)
    console.log(valid)

    // this.form.controls['email'].setAsyncValidators(this.validate)  动态验证
  }


  validate(c:FormControl):{[key:string]:any}{
    if(!c.value){
      return null
    }
    const pattern = /^wang+/
    if(pattern.test(c.value)){
      return null
    }
    return {
      emailNotValid:'email invalid'
    }
  }
}
