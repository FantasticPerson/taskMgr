import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {
  lists=[
    {
      id:1,
      name:'待办',
      tasks:[
        {
          id:1,
          desc:'任务一：去星巴克买杯咖啡',
          completed:true,
          reminder:new Date(),
          priority:3,
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买杯咖啡',
          completed:true,
          priority:2,
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买杯咖啡',
          completed:false,
          priority:1,
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date()
        }
      ]
    },
    {
      id:1,
      name:'待办',
      tasks:[
        {
          id:1,
          desc:'任务一：去星巴克买杯咖啡',
          completed:false,
          priority:3,
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买杯咖啡',
          completed:false,
          priority:2,
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买杯咖啡',
          completed:false,
          priority:1,
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date()
        }
      ]
    },
    {
      id:1,
      name:'待办',
      tasks:[
        {
          id:1,
          desc:'任务一：去星巴克买杯咖啡',
          completed:false,
          priority:3,
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买杯咖啡',
          completed:false,
          priority:2,
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买杯咖啡',
          completed:false,
          priority:1,
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date()
        }
      ]
    }
  ]
  constructor(private dialog:MdDialog) { }

  ngOnInit() {
  }

  lunchNewTaskDialog(){
    this.dialog.open(NewTaskComponent)
  }
}
