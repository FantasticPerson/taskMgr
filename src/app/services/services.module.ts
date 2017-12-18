import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from './quotes.service';
import { ProjectService } from './project.service';
import { TaskListService } from './task-list.service';
import { TaskService } from './task.service';

// @NgModule({
//   imports: [
//     CommonModule
//   ],
  
//   declarations: []
// })
export{
  QuoteService
}
@NgModule()
export class ServicesModule { 
  static forRoot(){
    return {
      ngModule:ServicesModule,
      providers:[
        QuoteService,
        ProjectService,
        TaskListService,
        TaskService
      ]
    }
  }
}
