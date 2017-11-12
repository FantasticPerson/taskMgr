import { Component, OnInit, Input } from '@angular/core';
import { MdDialog , MaterialModule } from '@angular/material'
import { NewProjectComponent } from '../new-project/new-project.component'

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
    const dialogRef = this.dialog.open(NewProjectComponent,{data:'this is my data sent'})
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result)
    })
  }

}
