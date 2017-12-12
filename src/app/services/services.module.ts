import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from './quotes.service';

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
        QuoteService
      ]
    }
  }
}
