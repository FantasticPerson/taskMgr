import { Directive,HostListener,Renderer2,ElementRef,Input } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[app-draggable][dragTag][dragData][draggedClass]'
})
export class DragDirective {
  private _isDraggble = false;
  @Input('app-draggable')
  set isDraggable(val:boolean){
    this._isDraggble = val
    this.rd.setAttribute(this.el.nativeElement,'draggable',`${val}`)
  }

  @Input() dragTag:string
  @Input() dragData:any

  get isDraggable(){
    return this._isDraggble
  }

  @Input() draggedClass:string
  constructor(private el:ElementRef,private rd:Renderer2,private service:DragDropService) { }

  @HostListener('dragstart',['$event'])
  onDragStart(ev:Event){
    if(this.el.nativeElement === ev.target){
      this.rd.addClass(this.el.nativeElement,this.draggedClass)
      this.service.setDragData({tag:this.dragTag,data:this.dragData})
    }
  }

  @HostListener('dragend',['$event'])
  onDragEnd(ev:Event){
    if(this.el.nativeElement === ev.target){
      this.rd.removeClass(this.el.nativeElement,this.draggedClass)
    }
  }

}
