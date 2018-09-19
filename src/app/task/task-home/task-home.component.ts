import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  animations: [slideToRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {
  @HostBinding('@routerAnim') state
  lists = [
    {
      order:1,
      id: 1,
      name: '待办',
      tasks: [
        {
          completed: true,
          id: 1,
          desc: '任务一：去星巴克买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          priority: 3
        },
        {
          completed: true,
          id: 1,
          desc: '任务一：去星巴克买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          priority: 2
        },
        {
          completed: false,
          id: 1,
          desc: '任务一：去星巴克买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          priority: 1
        },
        {
          completed: false,
          id: 1,
          desc: '任务一：去星巴克买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          priority: 3
        }
      ]
    },
    {
      order:2,
      id: 1,
      name: '待办',
      tasks: [
        {
          completed: false,
          id: 1,
          desc: '任务一：去星巴克买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          priority: 2
        },
        {
          completed: false,
          id: 1,
          desc: '任务一：去星巴克买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          priority: 3
        },
        {
          completed: false,
          id: 1,
          desc: '任务一：去星巴克买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          priority: 3
        },
        {
          completed: false,
          id: 1,
          desc: '任务一：去星巴克买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          priority: 3
        }
      ]
    },
    {
      order:3,
      id: 1,
      name: '待办',
      tasks: [
        {
          completed: false,
          id: 1,
          desc: '任务一：去星巴克买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          priority: 3
        },
        {
          completed: false,
          id: 1,
          desc: '任务一：去星巴克买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          reminder: new Date(),
          priority: 3
        },
        {
          completed: false,
          id: 1,
          desc: '任务一：去星巴克买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          priority: 3
        },
        {
          completed: false,
          id: 1,
          desc: '任务一：去星巴克买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          priority: 3
        }
      ]
    }
  ]
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  launchNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '新建任务' } })
  }
  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, { data: { lists: this.lists } })
  }
  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '修改任务', task: task } })
  }
  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除任务列表', content: '您确认任务列表吗?' } })
    dialogRef.afterClosed().subscribe(result => console.log(result))
  }
  launchEditListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '更改列表名称' } })
    dialogRef.afterClosed().subscribe(result => console.log(result))
  }
  launchNewListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '新建列表' } })
    dialogRef.afterClosed().subscribe(result => console.log(result))
  }
  handleMove(srcData, list) {
    console.log(srcData)
    switch (srcData.tag) {
      case 'task-item':
        console.log('taskItem')
        break;
      case 'task-list':
        console.log('list')
        const srcList = srcData.data;
        const tempOrder = srcList.order
        srcList.order = list.order
        list.order = tempOrder
        break;
      default:
        break
    }
  }

  handleQuickTask(desc:string){
    console.log(desc)
  }
}
