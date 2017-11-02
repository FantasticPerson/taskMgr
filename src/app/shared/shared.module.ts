import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MdToolbarModule, 
  MdIconModule, 
  MdCardModule, 
  MdButtonModule,
  MdInputModule,
  MdListModule,
  MdSlideToggleModule } from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule
  ],
  exports:[
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule
  ],
  declarations: []
})
export class SharedModule { 

}
