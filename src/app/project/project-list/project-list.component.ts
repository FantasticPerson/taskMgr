import { Component, OnInit, Input } from '@angular/core';
import { MdDialog , MaterialModule } from '@angular/material'
import { NewProjectComponent } from '../new-project/new-project.component'
import { InviteComponent } from '../invite/invite.component'
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      "name":'企业协作平台',
      "desc":'这是一个企业内部项目',
      "coverImg":'assets/quate_fullback.jpg'
    },
    {
      "name":'企业协作平台',
      "desc":'这是一个企业内部项目',
      "coverImg":'assets/quate_fullback.jpg'
    },
  ]
  constructor(private dialog:MdDialog) { }

  ngOnInit() {
  }

  openNewProjectDialog(){
    //{width:'100px',height:'100px',position:{left:'0',top:'0'}}
    const dialogRef = this.dialog.open(NewProjectComponent,{data:{title:'新建项目'}})
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result)
    })
  }

  launchInviteDialog(){
    this.dialog.open(InviteComponent)
  }

  launchUpdateDialog(){
    const dialogRef = this.dialog.open(NewProjectComponent,{data:{title:'编辑项目'}})
  }

  launchConfirmDialog(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data:{title:'删除项目',content:'您确认删除该项目吗？'}})
    dialogRef.afterClosed().subscribe(result=>{console.log(result)})    
  }
}
