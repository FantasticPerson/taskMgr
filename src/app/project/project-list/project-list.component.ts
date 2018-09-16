import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component'
import {InviteComponent} from '../invite/invite.component'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects = [
    {
      "name": "企业协作平台",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/img/covers/0.jpg"
    },
    {
      "name": "企业协作平台",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/img/covers/1.jpg"
    }
  ]
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    // this.dialog.open(NewProjectComponent,{width:'100px',height:'100px',position:{left:'0',top:'0'},data:'this is my data'})
    const dialogRef = this.dialog.open(NewProjectComponent,{data:'test'})
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result)
    })
  }

  launchInviteDialog(){
    const dialogRef = this.dialog.open(InviteComponent)
  }
}
