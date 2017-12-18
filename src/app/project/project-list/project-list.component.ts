import { Component, OnInit, Input,HostBinding,ChangeDetectionStrategy,ChangeDetectorRef,OnDestroy } from '@angular/core';
import { MdDialog , MaterialModule } from '@angular/material'
import { NewProjectComponent } from '../new-project/new-project.component'
import { InviteComponent } from '../invite/invite.component'
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../animate/router.anim'
import { listAnim } from '../../animate/list.anim'
import { ProjectService } from '../../services/project.service';
import * as _ from 'lodash'
import { Project } from '../../domain/index.model';
import { Subscription } from 'rxjs/Subscription';

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
export class ProjectListComponent implements OnInit,OnDestroy {
  @HostBinding('@routeAnim') state;

  projects = [

  ]
  sub:Subscription
  constructor(private dialog:MdDialog,private cd:ChangeDetectorRef,private serive$:ProjectService) { }

  ngOnInit() {
    this.serive$.get('1').subscribe(project => {
      this.projects = project
      this.cd.markForCheck();
    })
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe()
    }
  }

  openNewProjectDialog(){
    const selectedImg = `/assets/img/covers/${Math.floor((Math.random() * 40))}_tn.jpg`
    //{width:'100px',height:'100px',position:{left:'0',top:'0'}}
    const dialogRef = this.dialog.open(NewProjectComponent,{data:{thumbnails:this.getThumbnails(),img:selectedImg}})
    dialogRef.afterClosed()
      .take(1)
      .filter(n=>n)
      .map(val => ({...val,coverImg:this.buildImgSrc(val.coverImg)}))
      .switchMap(v=>this.serive$.update(v))
      .subscribe(project=>{
        this.projects = [...this.projects,project]
        // console.log(result)
        // this.projects = [...this.projects,{id:3,name:'一个新项目',desc:'这是一个新项目',coverImg:'assets/quate_fullback.jpg'},
        // {id:3,name:'又一个新项目',desc:'这是又一个新项目',coverImg:'assets/quate_fullback.jpg'}]
        this.cd.markForCheck()
      })
    
  }

  launchInviteDialog(){
    this.dialog.open(InviteComponent)
  }

  launchUpdateDialog(project:Project){
    const dialogRef = this.dialog.open(NewProjectComponent,{data:{thumbnails:this.getThumbnails(),project:project}})
    dialogRef.afterClosed()
      .take(1)
      .filter(n=>n)
      .map(val => ({...val,id:project.id,coverImg:this.buildImgSrc(val.coverImg)}))
      .switchMap(v=>this.serive$.add(v))
      .subscribe(project=>{
        const index = this.projects.map(p=>p.id).indexOf(project.id)
        this.projects = [...this.projects.slice(0,index),project,this.projects.slice(index+1)]
        
        // console.log(result)
        // this.projects = [...this.projects,{id:3,name:'一个新项目',desc:'这是一个新项目',coverImg:'assets/quate_fullback.jpg'},
        // {id:3,name:'又一个新项目',desc:'这是又一个新项目',coverImg:'assets/quate_fullback.jpg'}]
        this.cd.markForCheck()
      })
  }

  launchConfirmDialog(project){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data:{title:'删除项目',content:'您确认删除该项目吗？'}})
    dialogRef.afterClosed()
      .take(1)
      .filter(n=>n)
      .map(val => ({...val,coverImg:this.buildImgSrc(val.coverImg)}))
      .switchMap(_=>this.serive$.del(project))
      .subscribe(prj=>{
        this.projects = this.projects.filter(p=>p.id !== prj.id)
        // console.log(result)
        // this.projects = [...this.projects,{id:3,name:'一个新项目',desc:'这是一个新项目',coverImg:'assets/quate_fullback.jpg'},
        // {id:3,name:'又一个新项目',desc:'这是又一个新项目',coverImg:'assets/quate_fullback.jpg'}]
        this.cd.markForCheck()
      })
  }

  private getThumbnails(){
    return _.range(0,40)
      .map(i=>`/assets/img/covers/${i}_tn_jpg`)
  }

  private buildImgSrc(img:string):string{
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img
  }
}
