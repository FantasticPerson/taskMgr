import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { LoginRoutingModule } from './login.routing.module'

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class LoginModule { }
