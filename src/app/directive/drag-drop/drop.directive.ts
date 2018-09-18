import { Directive, HostListener, ElementRef, Renderer2, Input,EventEmitter, Output } from '@angular/core';
import { DragDropService, DragData } from '../drag-drop.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Directive({
  selector: '[app-droppable][dragEnterClass][dropTags]'
})
export class DropDirective {

  @Output() dropped = new EventEmitter<DragData>()
  @Input() dragEnterClass: string
  @Input() dropTags: string[] = []

  private data$: Observable<DragData | null>;

  constructor(private el: ElementRef, private rd: Renderer2, private service: DragDropService) {
    this.data$ = this.service.getDragData().pipe(take(1))
  }

  @HostListener('dragenter', ['$event'])
  ondragenter(ev: Event) {
    ev.preventDefault()
    ev.stopPropagation()
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.addClass(this.el.nativeElement, this.dragEnterClass)
        }
      })
    }
  }

  @HostListener('dragover', ['$event'])
  ondragover(ev: Event) {
    ev.preventDefault()
    ev.stopPropagation()
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {

        }
      })
      // this.rd.addClass(this.el.nativeElement, this.dargEnterClass)

    }
  }

  @HostListener('dragleave', ['$event'])
  ondragleave(ev: Event) {
    console.log('dragStart')
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {

          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass)
        }
      })
    }
  }

  @HostListener('drop', ['$event'])
  ondrop(ev: Event) {
    ev.preventDefault()
    ev.stopPropagation()
    if (this.el.nativeElement === ev.target) {
      debugger
      this.data$.subscribe(dragData => {
        
        if (this.dropTags.indexOf(dragData.tag) > -1) {

          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass)
          this.dropped.emit(dragData)
          this.service.clearDragData()
        }
      })
    }
  }
}

