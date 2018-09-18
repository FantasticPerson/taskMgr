import { Directive, HostListener, ElementRef, Renderer2,Input } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[app-draggable][dragTag][dragData][draggedClass]'
})
export class DragDirective {
  private _isDraggable = false

  @Input('app-draggable')
  set isDraggable(val:boolean){
    this._isDraggable = val
    this.rd.setAttribute(this.el.nativeElement,'draggable',`${val}`)
  }

  get isDraggable(){
    return this._isDraggable
  }

  @Input() draggedClass: string

  @Input() dragTag:string
  @Input() dragData:any
  constructor(private el: ElementRef, private rd: Renderer2,private service:DragDropService) { }


  

  @HostListener('dragstart', ['$event'])
  ondragstart(ev: Event) {
    console.log('dragStart')
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass)
      this.service.setDragData({tag:this.dragTag,data:this.dragData})
    }
  }

  @HostListener('dragend', ['$event'])
  ondragend(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass)
    }
  }
}
