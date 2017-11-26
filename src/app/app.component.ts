import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/material'
import { trigger,state,transition,style,animate,keyframes } from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    trigger('squre',
      [
        state('green',style({'background-color':'green'})),
        state('red',style({'background-color':'red'})),
        transition('green=>red', animate(1000)),
        transition('red=>green', animate(5000,keyframes([
          style({transform:'translateY(100%)'}),
          style({transform:'translateY(98%)'}),
          style({transform:'translateY(95%)'}),
          style({transform:'translateY(90%)'}),
          style({transform:'translateY(80%)'}),
          style({transform:'translateY(60%)'}),
          style({transform:'translateY(30%)'}),
          style({transform:'translateY(0)'}),
          style({transform:'translateY(-10%)'}),
          style({transform:'translateY(-5%)'}),
          style({transform:'translateY(0)'})
        ])))         
      ])
  ]
})
export class AppComponent {
  darkTheme = false;
  squreState:string
  constructor(private oc:OverlayContainer){

  }
  switchTheme(dark){
    console.log(dark)
    this.darkTheme = dark;
    this.oc.themeClass = dark ? 'myapp-dark-theme' : null;
  }

  onClick(){
    this.squreState = this.squreState === "red" ? 'green' : 'red'
  }
}
