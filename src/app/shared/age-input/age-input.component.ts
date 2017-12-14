import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR,NG_VALIDATORS,FormControl,FormBuilder,FormGroup } from '@angular/forms'
import { Observable } from 'rxjs/Observable';
import {
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInYears,
  isBefore,
  parse,
  differenceInMonths,
  format
} from 'date-fns'
// import { format } from 'path';

export enum AgeUnit{
  Year=0,
  Month,
  day
}

export interface Age{
  age:number;
  unit:AgeUnit;
}

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
      birthday:['',this.validateDate],
      age:this.fb.group({
        ageNum:[],
        ageUnit:[]
      },{validator:this.validateAge('ageNum','ageUnit')})
    })

    const birthday = this.form.get('birthday')
    const ageNum = this.form.get('ageNum')
    const ageUnit = this.form.get('ageUnit')

    const birthday$ = birthday.valueChanges
      .map(d=>{
        return {data:d,from:'birthday'}
      })
      .filter(_=>birthday.valid)
      .debounceTime(300)
      .distinctUntilChanged()
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(300)
      .distinctUntilChanged()
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(300)
      .distinctUntilChanged()
    const age$ = Observable
      .combineLatest(ageNum$,ageUnit$,(_n,_u)=>{
        return this.toDate({age:_n,unit:_u})
      })
      .map(d=>{
        return {date:d,from:'age'}
      })
      .filter(_=>this.form.get('age').valid)

    const merged$ = Observable
      .merge(birthday$,age$)
      .filter(_=>this.form.valid);
    merged$.subscribe(d=>{
      const age = this.toAge(d.date);
      if(d.from !== 'birthday'){
        if(age.age !== ageNum.value){
          ageNum.patchValue(age.age,{emitEvent:false})
        }
        if(age.unit !== ageUnit.value){
          ageUnit.patchValue(age.unit,{emitEvent:false})
        }
        this.propagateChange(d.date)
      } else {
        const ageToCompare = this.toAge(birthday.value)
        if(age.age !== ageToCompare.age || age.unit !== ageToCompare.unit){
          birthday.patchValue(d.date,{emitEvent:false})
          this.propagateChange(d.date)
        }
      }
    })
    
  }

  validate(c:FormControl):{[key:string]:any}{
    
  }

  validateDate(c:FormControl):{[key:string]:any}{
    return this.selected ? null : {
      imageListInvalid:{
        valid:false
      }
    }
  }

  validateAge(ageNumKey:string,ageUnitKey:string):{[key:string]:any}{
    return this.selected ? null : {
      imageListInvalid:{
        valid:false
      }
    }
  }

  writeValue(obj: any): void{

  }

  registerOnChange(fn: any): void{
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void{

  }

  toAge(dateStr:string):Age{
    const date = parse(dateStr)
    const now = Date.now()
    return isBefore(subDays(now,90),date) ? 
      { age:differenceInDays(now,date),unit:AgeUnit.day} :
        isBefore(subMonths(now,24),date) ? 
          {age:differenceInMonths(now,date),unit:AgeUnit.Month} :
            {
              age:differenceInYears(now,date),
              unit:AgeUnit.Year
            };
  }

  toDate(age:Age):string{
    const now = Date.now();
    const dateFormat = "YYYY-MM-DD"
    switch(age.unit){
      case AgeUnit.Year:{
        return format(subYears(now,age.age),dateFormat)
      }
      case AgeUnit.Year:{
        return format(subMonths(now,age.age),dateFormat)
      }
      case AgeUnit.Year:{
        return format(subDays(now,age.age),dateFormat)        
      }
      default:{
        return null;
      }
    }
  }
}
