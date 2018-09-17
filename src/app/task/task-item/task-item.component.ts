import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { itemAnim } from '../../anims/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  animations: [itemAnim]
})
export class TaskItemComponent implements OnInit {
  @Input() item
  @Input() avatar
  @Output() taskClick = new EventEmitter<void>()
  widerPriority = 'in'

  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassined'
  }

  onEditClick() {
    this.taskClick.emit()
  }
  onCheckboxClick(e: Event) {
    e.stopPropagation()
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.widerPriority = 'out'
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPriority = 'in'
  }
}
