import { Component, OnInit, forwardRef,OnDestroy,Input } from '@angular/core';
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
  format,
  isDate,
  isFuture,
  isValid
} from 'date-fns'
// import { format } from 'path';
import  {isValidDate} from '../../utils/date.util'
import { Subscription } from 'rxjs/Subscription';

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
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true,
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor,OnInit,OnDestroy{
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsTop = 150;
  @Input() yearsBottom = 1;
  @Input() format = 'YYYY-MM-DD';
  @Input() debounceTime = 300
  
  selectedUnit = AgeUnit.Year
  ageUnits=[
    {value:AgeUnit.Year,label:'岁'},
    {value:AgeUnit.Month,label:'月'},
    {value:AgeUnit.day,label:'天'},    
  ]
  form:FormGroup
  sub:Subscription
  private propagateChange = (_:any)=>{};
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      birthday:['',this.validateDate],
      age:this.fb.group({
        ageNum:[],
        ageUnit:[AgeUnit.Year]
      },{validator:this.validateAge('ageNum','ageUnit')})
    })

    const birthday = this.form.get('birthday')
    // debugger
    const ageNum = this.form.get('age').get('ageNum')
    const ageUnit = this.form.get('age').get('ageUnit')

    const birthday$ = birthday.valueChanges
      .map(d=>{
        return {date:d,from:'birthday'}
      })
      .filter(_=>birthday.valid)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(this.debounceTime)
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
    this.sub = merged$.subscribe(d=>{
      const age = this.toAge(d.date);
      console.log(age)
      if(d.from === 'birthday'){
        if(age.age !== ageNum.value){
          ageNum.patchValue(age.age,{emitEvent:false})
        }
        if(age.unit !== ageUnit.value){
          this.selectedUnit = age.unit
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

  ngOnDestroy(){

  }

  validate(c:FormControl):{[key:string]:any}{
    const val = c.value
    if(!val){
      return null
    }
    if(!isValidDate(val)){
      return null
    }
    return {
      dateOfBirthValid:true
    }
  }

  validateDate(c:FormControl):{[key:string]:any}{
    const val = c.value
    return isValidDate(val) ? null : {
      birthdayInvalid:true
    }; 
  }

  validateAge(ageNumKey:string,ageUnitKey:string){
    return (group:FormGroup):{[key:string]:any}=>{
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey]
      let result = false
      const ageNumVal = ageNum.value
      switch(ageUnit.value){
        case AgeUnit.Year:{
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop
          break
        }
        case AgeUnit.Year:{
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.monthsTop
          break
        }
        case AgeUnit.Year:{
          result = ageNumVal >=this.daysBottom && ageNumVal < this.daysBottom
          break      
        }
        default:{
          break
        }
      }
      return result ? null : {ageInvalid:true}
    }
  }

  writeValue(obj: any): void{
    if(obj){
      const date = format(obj,this.format)
      this.form.get('birthday').patchValue(date)
      const age = this.toAge(date)
      this.form.get('age').get('ageNum').patchValue(age.age)
      this.form.get('age').get('ageUnit').patchValue(age.unit)
    }
  }

  registerOnChange(fn: any): void{
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void{

  }

  toAge(dateStr:string):Age{
    const date = parse(dateStr)
    const now = Date.now()
    return isBefore(subDays(now,this.daysTop),date) ? 
      { age:differenceInDays(now,date),unit:AgeUnit.day} :
        isBefore(subMonths(now,this.monthsTop),date) ? 
          {age:differenceInMonths(now,date),unit:AgeUnit.Month} :
            {
              age:differenceInYears(now,date),
              unit:AgeUnit.Year
            };
  }

  toDate(age:Age):string{
    const now = Date.now();

    switch(age.unit){
      case AgeUnit.Year:{
        return format(subYears(now,age.age),this.format)
      }
      case AgeUnit.Year:{
        return format(subMonths(now,age.age),this.format)
      }
      case AgeUnit.Year:{
        return format(subDays(now,age.age),this.format)        
      }
      default:{
        return null;
      }
    }
  }
}
