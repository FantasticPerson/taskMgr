import { Component, OnInit,EventEmitter,Output,HostListener } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {
  desc:string
  @Output() quickTask = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

  onSubmit({value,valid},ev:Event){
    ev.preventDefault();
    console.log(value,valid)
  }

  @HostListener('keyup.enter')
  sendQuickTask(){
    if(!this.desc || this.desc.length === 0 || !this.desc.trim()){
      return;
    }
    this.quickTask.emit(this.desc)
    this.desc = ""
  }

}
