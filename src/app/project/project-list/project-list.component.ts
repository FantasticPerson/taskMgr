import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component'
import { InviteComponent } from '../invite/invite.component'
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ProjectService } from '../../servives/project.service';
import * as _ from 'lodash'
import { filter, switchMap, map, take } from 'rxjs/operators';
import { Project } from '../../domain';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @HostBinding('@routerAnim') state
  projects = []
  sub: Subscription
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef, private service$: ProjectService) { }

  ngOnInit() {
    this.sub = this.service$.get("1")
      .subscribe(projects => {
        this.projects = projects
        this.cd.markForCheck()
      })
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor((Math.random() * 40))}_tn.jpg`
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        thumbnails: this.getThumbnails(),
        img: selectedImg
      }
    })

    dialogRef.afterClosed()
      .pipe(take(1))
      .pipe(switchMap(project => {
        return this.service$.add(project)
      }))
      .pipe(filter(n => n ? true : false))
      .pipe(map(val => {
        return {
          ...val,
          coverImg: this.buildImgSrc(val.coverImg)
        }
      }))
      .subscribe(project => {
        this.projects = [...this.projects, project]

        this.cd.markForCheck()
      })
  }

  private getThumbnails() {
    return _.range(0, 40)
      .map(i => `/assets/img/covers/${i}_tn.jpg`)
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > 0 ? img.split('_')[0] + '.jpg' : img;
  }
  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent,{data:{members:[]}})
  }

  launchUpdateDialog(project: Project) {
    const converImg = this.buildImgSrc(project.coverImg);
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        thumbnails: this.getThumbnails(),
        project: project,
        img: converImg
      }
    })

    dialogRef.afterClosed()
      .pipe(take(1))
      .pipe(switchMap(val => {
        return this.service$.update({
          ...val,
          id: project.id,
          coverImg: this.buildImgSrc(val.coverImg)
        })
      }))
      .pipe(filter(n => n ? true : false))
      .pipe(map(val => {
        return {
          ...val,
          id: project.id,
          coverImg: this.buildImgSrc(val.coverImg)
        }
      }))
      .subscribe(project => {
        const index = this.projects.map(p => p.id).indexOf(project.id)

        this.projects = [...this.projects.slice(0, index), project, ...this.projects.slice(index + 1)]


        this.cd.markForCheck()
      })
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除项目', content: '您确认删除项目吗?' } })

    dialogRef.afterClosed()
      .pipe(take(1))
      .pipe(filter(n => n ? true : false))
      .pipe(switchMap(_ => this.service$.del(project)))
      .subscribe(prj => {
        this.projects = this.projects.filter(p => p.id !== prj.id)
        this.cd.markForCheck()
      })
  }
}
