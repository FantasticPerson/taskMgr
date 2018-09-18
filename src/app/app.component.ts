import { Component, ReflectiveInjector, Inject, inject } from '@angular/core';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations'
import { environment } from '../environments/environment';

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
        transition('red=>green', animate(5000, keyframes([
          style({ transform: 'translateY(100%)' }),
          style({ transform: 'translateY(98%)' }),
          style({ transform: 'translateY(95%)' }),
          style({ transform: 'translateY(90%)' }),
          style({ transform: 'translateY(80%)' }),
          style({ transform: 'translateY(60%)' }),
          style({ transform: 'translateY(30%)' }),
          style({ transform: 'translateY(20%)' }),
          style({ transform: 'translateY(10%)' }),
          style({ transform: 'translateY(0%)' }),
          style({ transform: 'translateY(10%)' }),
          style({ transform: 'translateY(20%)' }),
          style({ transform: 'translateY(30%)' }),
          style({ transform: 'translateY(60%)' }),
          style({ transform: 'translateY(80%)' }),
          style({ transform: 'translateY(90%)' }),
          style({ transform: 'translateY(95%)' }),
          style({ transform: 'translateY(98%)' }),
          style({ transform: 'translateY(100%)' }),
        ])))
      ]
    )
  ]
})
export class AppComponent {
  squareState: string
  darkTheme = false;
  constructor(@Inject('BASE_CONFIG') config) {
    console.log(config)
    // const injector = ReflectiveInjector.resolveAndCreate([
    // Person//useClass 可以直接放一个类在这儿
    //   { provide: Person, userClass: Person },
    //   {
    //     provide: Address, useFactory: () => {
    //       if (environment.production) {
    //         return new Address('北京', '北京', '朝阳区', 'xx街道')
    //         return ()=>{//每次返回一个新对象
    //           return new Address('北京', '北京', '朝阳区', 'xx街道')
    //         }
    //       } else {
    //         return new Address('北京22', '北京22', '朝阳区22', 'xx街道22')
    //       }
    //     }
    //   },
    //   {
    //     provide: Id, useFactory: () => {
    //       return id.getInstance('idcard')
    //     }
    //   },
    // ])
    // const person = injector.get(Person)
    // const childInjector = injector.resolveAndCreateChild([Person])
    // const personFromChild = childInjector.get(Person)

    // personFromChild != person
  }
  swtichTheme(dark) {
    this.darkTheme = dark
  }

  onClick() {
    this.squareState = this.squareState === 'red' ? 'green' : 'red'
  }
}

// class Id {
//   static getInstance(type: string): Id {
//     return new Id()
//   }
// }

// class Address {
//   provuince: string;
//   city: string;
//   district: string;
//   street: string
//   constructor(provuince, city, district, street) {
//     this.provuince = provuince
//     this.city = city
//     this.district = district
//     this.street = street
//   }
// }
// class Person {
//   id: Id;
//   address: Address;
//   constructor(@Inject(id) id, @Inject(Address) address) {
//     this.id = id
//     this.address = address
//   }
// }
// main(){
//   const id = Id.getInstance('Idcard')
//   const address = new Address('北京', '北京', '朝阳区', 'xx街道')
//   const person = new Person(id, address)
// }
