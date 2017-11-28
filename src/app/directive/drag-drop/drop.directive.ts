import { Directive,HostListener,Renderer2,ElementRef,Input,Output,EventEmitter } from '@angular/core';
import { DragDropService, DragData } from '../drag-drop.service';

@Directive({
  selector: '[app-droppable][dropTags][dragEnterClass]'
})
export class DropDirective {
  @Input() dragEnterClass:string
  @Input() dropTags:string[] = []
  @Output() dropped = new EventEmitter<DragData>()
  private data$;

  constructor(private el:ElementRef,private rd:Renderer2,private service:DragDropService) { 
    this.data$ = this.service.getDragData().take(1)
  }

  @HostListener('dragenter',['$event'])
  onDragEnter(ev:Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.data$.subscribe(dragData=>{
        if(this.dropTags.indexOf(dragData.tag)>-1){
          this.rd.addClass(this.el.nativeElement,this.dragEnterClass)
        }
      })
    }
  }

  @HostListener('dragover',['$event'])
  onDragOver(ev:Event){
    if(this.el.nativeElement === ev.target){
      this.rd.addClass(this.el.nativeElement,this.dragEnterClass)
    }
  }

  @HostListener('dragleave',['$event'])
  onDragLeave(ev:Event){
    if(this.el.nativeElement === ev.target){
      this.rd.removeClass(this.el.nativeElement,this.dragEnterClass)
    }
  }

  @HostListener('drop',['$event'])
  onDrop(ev:Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.data$.subscribe(dragData =>{
        this.rd.removeClass(this.el.nativeElement,this.dragEnterClass)
        this.dropped.emit(dragData);
        this.service.clearDragData();
      })
    }
  }
}
