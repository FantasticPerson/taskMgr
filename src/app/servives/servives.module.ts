import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { QuoteService } from './quote.service'
import { ProjectService } from './project.service'
import { TaskListService } from './task-list.service'
import { TaskService } from './task.service'
import { UserService } from './user.service'
import { AuthService } from './auth.service'
import { UserService } from './user.service'

@NgModule()
export class ServivesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServivesModule,
      providers: [
        QuoteService,
        ProjectService,
        TaskListService,
        TaskService,
        UserService,
        AuthService,
        UserService
      ]
    }
  }
}
