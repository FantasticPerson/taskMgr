import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from '../../anims/router.anim';


@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.css'],
  animations:[slideToRight]
})
export class TaskHomeComponent implements OnInit {
@HostBinding('@routerAnim') state
  lists = [
    {
      id:1,
      name:'待办',
      tasks:[
        {
          completed:true,
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
          priority:3
        },
        {
          completed:true,
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
          priority:2
        },
        {
          completed:false,
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
          priority:1
        },
        {
          completed:false,
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
          priority:3
        }
      ]
    },
    {
      id:1,
      name:'待办',
      tasks:[
        {
          completed:false,
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
          priority:2
        },
        {
          completed:false,
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
          priority:3
        },
        {
          completed:false,
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
          priority:3
        },
        {
          completed:false,
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
          priority:3
        }
      ]
    },
    {
      id:1,
      name:'待办',
      tasks:[
        {
          completed:false,
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
          priority:3
        },
        {
          completed:false,
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
          reminder:new Date(),
          priority:3
        },
        {
          completed:false,
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
          priority:3
        },
        {
          completed:false,
          id:1,
          desc:'任务一：去星巴克买咖啡',
          owner:{
            id:1,
            name:'张三',
            avatar:'avatars:svg-11'
          },
          dueDate:new Date(),
          priority:3
        }
      ]
    }
  ]
  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }

  launchNewTaskDialog(){
    const dialogRef = this.dialog.open(NewTaskComponent,{data:{title:'新建任务'}})
  }
  launchCopyTaskDialog(){
    const dialogRef = this.dialog.open(CopyTaskComponent,{data:{lists:this.lists}})
  }
  launchUpdateTaskDialog(task){
    const dialogRef = this.dialog.open(NewTaskComponent,{data:{title:'修改任务',task:task}})
  }
  launchConfirmDialog(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data:{title:'删除任务列表',content:'您确认任务列表吗?'}})
    dialogRef.afterClosed().subscribe(result=>console.log(result)) 
  }
  launchEditListDialog(){
    const dialogRef = this.dialog.open(NewTaskListComponent,{data:{title:'更改列表名称'}})
    dialogRef.afterClosed().subscribe(result=>console.log(result)) 
  }
  launchNewListDialog(){
    const dialogRef = this.dialog.open(NewTaskListComponent,{data:{title:'新建列表'}})
    dialogRef.afterClosed().subscribe(result=>console.log(result)) 
  }
}
