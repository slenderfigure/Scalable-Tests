import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './main-page/login/login.component';
import { SignupComponent } from './main-page/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
