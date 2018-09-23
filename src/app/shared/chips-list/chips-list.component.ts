import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup } from '@angular/forms'
import { User } from '../../domain';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { UserService } from '../../servives/user.service';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    }
  ]
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {
  @Input() multiple = true
  @Input() placeholderText = "输入成员email"
  @Input() label=""


  form: FormGroup;
  items: User[] = []
  memberResults$: Observable<User[]>
  private propagationChange = (_: any) => { }

  constructor(private fb:FormBuilder,private service:UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: [''],
    })
    this.memberResults$ = this.form.get('memberSearch').valueChanges
    .pipe(debounceTime(300))
    .pipe(distinctUntilChanged())
    .pipe(filter(s=>s && s.length>1))
    .pipe(switchMap(str=>this.service.searchUsers(str)))
  }

  validate(c: FormControl): { [key: string]: any } {
    return this.items ? null : {
      chipListInvalid: true
    }

  }

  removeMember(member: User) {
    const ids = this.items.map(item => item.id)
    const i = ids.indexOf(member.id)

    if (this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
    } else {
      this.items = [];
    }

    this.form.patchValue({ memberSearch: '' })
    this.propagationChange(this.items)
  }

  handleMemberSelection(member: User) {
    if (this.items.map(item => item.id).indexOf(member.id) >=0) {
      return
    }
    this.items = this.multiple ? [...this.items, member] : [member]
    this.form.patchValue{ { memberSearch: member.name } }
    this.propagationChange(this.items)
  }

  displayUser(user: User): string {
    return user ? user.name : ''
  }
  get displayInput(){
    return this.multiple || this.items.length === 0
  }

  writeValue(obj: User[]): void {
    if (obj && this.multiple) {
      const userEntities = obj.reduce((e, c) => {
        return {
          ...e.c
        }
      }, {})
      if (this.items) {
        const remaining = this.items.filter(item => !userEntities[item.id])
        this.items = [...remaining, ...obj]
      }
    } else if(obj && !this.multiple) {
      this.items = [...obj]
    }
  }

  registerOnChange(fn: any): void {
    this.propagationChange = fn
  }

  registerOnTouched(fn: any): void { }

}
