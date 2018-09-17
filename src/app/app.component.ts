import { Component } from '@angular/core';
import { trigger, state, transition, style, animate,keyframes } from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('square',
      [
        state('green', style({ 'background-color': 'green', 'height': '100px', 'transform': 'translateY(-100%)' })),
        state('red', style({ 'background-color': 'red', 'height': '100px', 'transform': 'translateY(100%)' })),
        transition('green=>red', animate('.8s ease-in')),
        transition('red=>green', animate(5000,keyframes([
          style({transform:'translateY(100%)'}),
          style({transform:'translateY(98%)'}),
          style({transform:'translateY(95%)'}),
          style({transform:'translateY(90%)'}),
          style({transform:'translateY(80%)'}),
          style({transform:'translateY(60%)'}),
          style({transform:'translateY(30%)'}),
          style({transform:'translateY(20%)'}),
          style({transform:'translateY(10%)'}),
          style({transform:'translateY(0%)'}),
          style({transform:'translateY(10%)'}),
          style({transform:'translateY(20%)'}),
          style({transform:'translateY(30%)'}),
          style({transform:'translateY(60%)'}),
          style({transform:'translateY(80%)'}),
          style({transform:'translateY(90%)'}),
          style({transform:'translateY(95%)'}),
          style({transform:'translateY(98%)'}),
          style({transform:'translateY(100%)'}),
        ])))
      ]
    )
  ]
})
export class AppComponent {
  squareState: string
  darkTheme = false;

  swtichTheme(dark) {
    this.darkTheme = dark
  }

  onClick() {
    this.squareState = this.squareState === 'red' ? 'green' : 'red'
  }
}
