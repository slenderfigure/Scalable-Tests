import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageLoaderDirective } from './image-loader.directive';


@NgModule({
  declarations: [
    SpinnerComponent,
    ImageLoaderDirective
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SpinnerComponent,
    ImageLoaderDirective    
  ]
})
export class SharedModule { }
