import { Component, OnInit , Input, Output, EventEmitter,HostBinding,HostListener,ChangeDetectionStrategy } from '@angular/core';
import { cardAnim } from '../../animate/card.anim'

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations:[cardAnim],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() onInvite = new EventEmitter<void>()
  @Output() onEdit = new EventEmitter<void>()
  @Output() onDelete = new EventEmitter<void>()
  @HostBinding('@card') cardState = 'out';

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter')
  onMouseEnter(){
    this.cardState = 'hover'
  }
  @HostListener('mouseleave')
  onMouseLeave(){
    this.cardState = 'out'
  }

  onInviteClick(){
    this.onInvite.emit()
  }

  onEditClick(){
    this.onEdit.emit()
  }

  onDeleteClick(){
    this.onDelete.emit()
  }

}
