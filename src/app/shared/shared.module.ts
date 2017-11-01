import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MdToolbarModule, 
  MdIconModule, 
  MdCardModule, 
  MdButtonModule,
  MdInputModule } from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule
  ],
  exports:[
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule
  ],
  declarations: []
})
export class SharedModule { 

}
