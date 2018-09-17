import { Component, OnInit, Input, Output, EventEmitter, HostBinding,HostListener } from '@angular/core';
import {cardAnim} from '../../anims/card.anim'

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations:[
    cardAnim
  ]
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() onInvite = new EventEmitter<void>()
  @Output() onEdit = new EventEmitter<void>()
  @Output() onDel = new EventEmitter<void>()
  @HostBinding('@card') cardState = 'out'

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter',['$event.target'])
  onMouseEnter(){
    this.cardState = 'hover'
  }

  @HostListener('mouseleave',['$event.target'])
  onMouseLeave(){
    this.cardState = 'out'
  }

  onInviteDialog() {
    this.onInvite.emit()
  }

  onEidtClick(){
    this.onEdit.emit()
  }

  onDelClick(){
    this.onDel.emit()
  }
}
