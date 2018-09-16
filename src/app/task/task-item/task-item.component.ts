import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() item
  @Input() avatar
  @Output() taskClick = new EventEmitter<void>()
  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassined'
  }

  onEditClick() {
    this.taskClick.emit()
  }
  onCheckboxClick(e:Event){
    e.stopPropagation()
  }
}
