import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    SpinnerComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    SpinnerComponent
  ]
})
export class SharedModule { }
