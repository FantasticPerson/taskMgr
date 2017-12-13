import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR,NG_VALIDATORS,FormControl,FormBuilder,FormGroup } from '@angular/forms'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss']
})
export class AgeInputComponent implements ControlValueAccessor{
  form:FormGroup
  private propagateChange = (_:any)=>{};
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      birthday:[],
      age:this.fb.group({
        ageNum:[],
        ageUnit:[]
      })
    })

    const birthday = this.form.get('birthday')
    const ageNum = this.form.get('ageNum')
    const ageUnit = this.form.get('ageUnit')

    const birthday$ = birthday.valueChanges.map(d=>{
      return {data:d,from:'birthday'}
    })
    const ageNum$ = ageNum.valueChanges
    const ageUnit$ = ageUnit.valueChanges
    const age$ = Observable.combineLatest(ageNum$,ageUnit$,(_n,_u)=>{
      return this.toDate({age:_n,unit:_u})
    })
    .map(d=>{
      return {date:d,from:'age'}
    })

    const merged$ = Observable.merge(birthday$,age$);

    
  }

  writeValue(obj: any): void{

  }

  registerOnChange(fn: any): void{
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void{

  }
}
