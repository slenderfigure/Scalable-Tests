import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SpinnerComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    SpinnerComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
