import { Component, OnInit, Input,HostBinding,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { MdDialog , MaterialModule } from '@angular/material'
import { NewProjectComponent } from '../new-project/new-project.component'
import { InviteComponent } from '../invite/invite.component'
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../animate/router.anim'
import { listAnim } from '../../animate/list.anim'
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations:[
    slideToRight,
    listAnim
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  @HostBinding('@routeAnim') state;

  projects = [

  ]
  constructor(private dialog:MdDialog,private cd:ChangeDetectorRef,private serive$:ProjectService) { }

  ngOnInit() {
    this.serive$.get('1').subscribe(project => this.projects = project)
  }

  openNewProjectDialog(){
    //{width:'100px',height:'100px',position:{left:'0',top:'0'}}
    const dialogRef = this.dialog.open(NewProjectComponent,{data:{title:'新建项目'}})
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result)
      this.projects = [...this.projects,{id:3,name:'一个新项目',desc:'这是一个新项目',coverImg:'assets/quate_fullback.jpg'},
      {id:3,name:'又一个新项目',desc:'这是又一个新项目',coverImg:'assets/quate_fullback.jpg'}]
      this.cd.markForCheck()
    })
    
  }

  launchInviteDialog(){
    this.dialog.open(InviteComponent)
  }

  launchUpdateDialog(){
    const dialogRef = this.dialog.open(NewProjectComponent,{data:{title:'编辑项目'}})
  }

  launchConfirmDialog(item){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data:{title:'删除项目',content:'您确认删除该项目吗？'}})
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result)
      this.projects = this.projects.filter(p=>{
        p.id != item.id
      })
      this.cd.markForCheck()
    })    
  }
}
