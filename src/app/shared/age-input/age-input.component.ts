import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup } from '@angular/forms'
import { map, filter, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, combineLatest, merge, Subscription } from 'rxjs';
import { isValidDate } from '../../utils/date.util'

import {
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isBefore,
  parse,
  format,
  isValid,
  isFuture
} from 'date-fns'
import { isDate } from 'util';

export enum AgeUnit {
  Year= 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() daysTop = 90
  @Input() daysBottom = 0
  @Input() monthsTop = 24
  @Input() monthsBottom = 1
  @Input() yearsTop = 150
  @Input() yearsBottom = 1
  @Input() format = 'YYYY-MM-DD'
  @Input() debounceTime = 300

  sub:Subscription
  selectedUnit = AgeUnit.Year;
  ageUnits = [
    { value: AgeUnit.Year, label: '岁' },
    { value: AgeUnit.Month, label: '月' },
    { value: AgeUnit.Day, label: '天' },
  ]
  form: FormGroup;
  private propagationChange = (_: any) => { }

  constructor(private fb: FormBuilder) { }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe()
    }
  }
  ngOnInit() {
    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      },{ validator: this.validateAge('ageNum', 'ageUnit') })
    })
    const birthday = this.form.get('birthday')
    const ageNum = this.form.get('age').get('ageNum')
    const ageUnit = this.form.get('age').get('ageUnit')

    const birthday$ = birthday.valueChanges
      .pipe(map(d => {
        return { date: d, from: 'birthday' }
      }))
      .pipe(debounceTime(this.debounceTime))
      .pipe(distinctUntilChanged())
      .pipe(filter(_ => birthday.valid))

    const ageNum$ = ageNum.valueChanges
      .pipe(startWith(ageNum.value))
      .pipe(debounceTime(this.debounceTime))
      .pipe(distinctUntilChanged());
    const ageUnit$ = ageUnit.valueChanges
      .pipe(startWith(ageUnit.value))
      .pipe(debounceTime(this.debounceTime))
      .pipe(distinctUntilChanged());

    const age$ = combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({ age: _n, unit:_u })
    }).pipe(map(d => {
      return { date: d, from: 'age' }
    })).pipe(filter(_ => this.form.get('age').valid))

    const merged$ = merge(birthday$, age$)
      .pipe(filter(_ => this.form.valid))

    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date)
      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, { emitEvent: false })
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, { emitEvent: false })
        }
        this.propagationChange(d.date)
      } else {
        const ageToCompare = this.toAge(birthday.value)
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, { emitEvent: false })
          this.propagationChange(d.date)
        }
      }
    })
  }

  validate(c: FormControl): { [key: string]: any } {
    const val = c.value
    if (!val) {
      return null
    }
    if (isValidDate(val)) {
      return null
    }
    return {
      dateOfBirthInvalid: true
    }
  }

  validateDate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    return isValidDate(val) ? null : {
      birthdayInvalid: true
    }
  }

  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): { [key: string]: any } | null => {
      const ageNum = group.controls[ageNumKey]
      const ageUnit = group.controls[ageUnitKey]
      let result = false
      const ageNumVal = ageNum.value
      const ageUnitVal = ageUnit.value

      switch (ageUnitVal) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal <this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break;
        }
        default: {
          break
        }
      }

      return result ? null : { ageInvalid: true }
    }
  }

  toAge(dateStr: string):Age {
    const date = parse(dateStr);
    const now = new Date();
    if (isBefore(subDays(now, this.daysTop), date)) {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Day
      };
    } else if (isBefore(subMonths(now, this.monthsTop), date)) {
      return {
        age: differenceInMonths(now, date),
        unit: AgeUnit.Month
      };
    } else {
      return {
        age: differenceInYears(now, date),
        unit: AgeUnit.Year
      };
    }
  }

  toDate(age:Age) {
    const now = new Date();
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), this.format)
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), this.format)
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), this.format)
      }
      default: {
        return '1991-01-01';
      }
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      const date = format(obj, this.format)
      this.form.get('birthday').patchValue(date)
    }
  }

  registerOnChange(fn: any): void {
    this.propagationChange = fn
  }

  registerOnTouched(fn: any): void { }

}
