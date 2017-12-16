import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from './quotes.service';
import { ProjectService } from './project.service';

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
        ProjectService
      ]
    }
  }
}
