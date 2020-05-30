import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCenterRoutingModule } from './user-center-routing.module';
import { UserCenterComponent } from './user-center.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    UserCenterComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    UserCenterRoutingModule
  ]
})
export class UserCenterModule { }
