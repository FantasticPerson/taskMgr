import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  TaskFilterVM,
  TaskFilterItemVM,
  TaskFilterPriorityVM,
  TaskFilterOwnerVM
} from '../../../vm';
import {
  getSortVMLabel,
  getOwnerVMName,
  getOwnerVMAvatar,
  getCustomDateDesc,
  getDefaultCustomStartDate,
  getDefaultCustomEndDate,
  getUpdateTaskFilterVMBySort,
  getUpdateTaskFilterVMByOwner,
  getUpdateTaskFilterVMByDueDate,
  getUpdateTaskFilterVMByCreateDate,
  getUpdateTaskFilterVMByCustomCreateDate,
  getUpdateTaskFilterVMByPriority,
  getUpdateTaskFilterVMByCategory
} from '../../../utils/task-filter.util';
import * as fromRoot from '../../../reducers';
import * as TaskFilterActions from '../../../actions/task-filter.action';
import * as TaskFilterVMActions from '../../../actions/task-filter-vm.action';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-task-filter-nav',
  templateUrl: './task-filter-nav.component.html',
  styleUrls: ['./task-filter-nav.component.scss']
})
export class TaskFilterNavComponent implements OnInit, OnDestroy {

  @ViewChild('startDatePicker') startDatePicker: MatDatepicker<Date>;
  @ViewChild('endDatePicker') endDatePicker: MatDatepicker<Date>;

  @Output() closeClicked = new EventEmitter<void>();

  form: FormGroup;
  taskFilterVM: TaskFilterVM;
  taskDesc: string;

  private taskFilterVM$: Observable<TaskFilterVM>;
  private descFilter$: Observable<string>;
  private _taskFilterVMSub: Subscription;
  private _descFilterSub: Subscription;

  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>) {
    this.form = this.fb.group({
      descFilter: [''],
      startCreateDate: [getDefaultCustomStartDate()],
      endCreateDate: [getDefaultCustomEndDate()]
    });

    this.taskFilterVM$ = this.store$.select(fromRoot.getTaskFilterVMState);
    this.descFilter$ = this.form.controls['descFilter'].valueChanges;
  }

  ngOnInit() {
    this._taskFilterVMSub = this.taskFilterVM$.subscribe((filterVM: TaskFilterVM) => {
      this.taskFilterVM = filterVM;
    });

    this._descFilterSub = this.descFilter$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((desc: string) => {
        this.taskDesc = desc.trim();
        this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction({ ...this.taskFilterVM, desc: this.taskDesc }));
      });
  }

  ngOnDestroy() {
    if (this._taskFilterVMSub) {
      this._taskFilterVMSub.unsubscribe();
    }

    if (this._descFilterSub) {
      this._descFilterSub.unsubscribe();
    }
  }

  getSortLabel(): string {
    return getSortVMLabel(this.taskFilterVM);
  }

  getOwnerName(ownerVM: TaskFilterOwnerVM): string {
    return getOwnerVMName(ownerVM);
  }

  getOwnerAvatar(ownerVM: TaskFilterOwnerVM): string {
    return getOwnerVMAvatar(ownerVM);
  }

  getStartCreateDateDesc(): string {
    return getCustomDateDesc(this.taskFilterVM.customCreateDate.startDate);
  }

  getEndCreateDateDesc(): string {
    return getCustomDateDesc(this.taskFilterVM.customCreateDate.endDate);
  }

  onCloseClicked(ev: Event) {
    ev.preventDefault();
    this.closeClicked.emit();
  }

  onClearDesc(ev: Event) {
    ev.preventDefault();
    this.form.controls['descFilter'].setValue('');
  }

  onSortItemClicked(ev: Event, sortVM: TaskFilterItemVM) {
    ev.preventDefault();
    ev.stopPropagation();
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(getUpdateTaskFilterVMBySort(this.taskFilterVM, sortVM)));
  }

  onSaveSortItemClicked(ev: Event) {
    ev.preventDefault();
    this.store$.dispatch(new TaskFilterActions.UpdateTaskFilterAction(this.taskFilterVM));
  }

  onOwnerItemClicked(ev: Event, ownerVM: TaskFilterOwnerVM) {
    ev.preventDefault();
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(getUpdateTaskFilterVMByOwner(this.taskFilterVM, ownerVM)));
  }

  onDueDateItemClicked(ev: Event, dueDate: TaskFilterItemVM) {
    ev.preventDefault();
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(getUpdateTaskFilterVMByDueDate(this.taskFilterVM, dueDate)));
  }

  onCreateDateItemClicked(ev: Event, createDate: TaskFilterItemVM) {
    ev.preventDefault();
    this.store$.dispatch(
      new TaskFilterVMActions.UpdateTaskFilterVMAction(
        getUpdateTaskFilterVMByCreateDate(this.taskFilterVM, createDate)));
  }

  onStartCreateDateClicked(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();

    this.startDatePicker.open();
  }

  onEndCreateDateClicked(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();

    this.endDatePicker.open();
  }

  onStartCreateDateChanged(date: Date) {
    this.store$.dispatch(
      new TaskFilterVMActions.UpdateTaskFilterVMAction(
        getUpdateTaskFilterVMByCustomCreateDate(this.taskFilterVM, date, true)));
  }

  onEndCreateDateChanged(date: Date) {
    this.store$.dispatch(
      new TaskFilterVMActions.UpdateTaskFilterVMAction(
        getUpdateTaskFilterVMByCustomCreateDate(this.taskFilterVM, date, false)));
  }

  onPriorityItemClicked(ev: Event, priority: TaskFilterPriorityVM) {
    ev.preventDefault();
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(getUpdateTaskFilterVMByPriority(this.taskFilterVM, priority)));
  }

  onEditFilterHeaderClicked(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  onEditFilterCloseClicked(ev: Event) {
    ev.preventDefault();
  }

  onEditFilterItemClicked(ev: Event, category: TaskFilterItemVM) {
    ev.preventDefault();
    ev.stopPropagation();
    const updatedTaskFilterVM: TaskFilterVM = getUpdateTaskFilterVMByCategory(this.taskFilterVM, category);
    this.store$.dispatch(new TaskFilterVMActions.UpdateTaskFilterVMAction(updatedTaskFilterVM));
    this.store$.dispatch(new TaskFilterActions.UpdateTaskFilterAction(updatedTaskFilterVM));
  }
}
