import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private fb:FormBuilder) { }
  form:FormGroup

  ngOnInit() {
    // this.form = new FormGroup({
    //   email:new FormControl('wang@163.com',Validators.compose([Validators.required,Validators.email])),//Validators.required
    //   password:new FormControl('',Validators.required)
    // })
    this.form = this.fb.group({
      email:['wan@local.dev',Validators.compose([Validators.required,Validators.required,this.validate])],
      password:['',Validators.required]
    })
  }

  onSubmit({value,valid},ev:Event){
    ev.preventDefault()
    console.log(JSON.stringify(value))
    console.log(JSON.stringify(valid))
    // this.form.controls['email'].setValidators(this.validate)
  }

  validate(c:FormControl):{[key:string]:any}{
    if(!c.value){
      return null;
    }
    const pattern = /^wang+/;
    if(pattern.test(c.value)){
      return null
    } else {
      return {
        emailNotValid:'the email must start with wang'
      }
    }
  }
}
