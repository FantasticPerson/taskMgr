import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  priorities=[
    {
      value:'1',
      label:'紧急'
    },
    {
      value:'2',
      label:'重要'
    },
    {
      value:'3',
      label:'普通'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
