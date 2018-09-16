import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.css']
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id:1,
      name:'待办',
      tasks:[
        {
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatar:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatar:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatar:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatar:svg-11'
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
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatar:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatar:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatar:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatar:svg-11'
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
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatar:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatar:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatar:svg-11'
          },
          dueDate:new Date()
        },
        {
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatar:svg-11'
          },
          dueDate:new Date()
        }
      ]
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
