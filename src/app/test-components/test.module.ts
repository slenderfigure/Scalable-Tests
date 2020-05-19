import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TestRoutingModule } from './test-routing.module';
import { TestService } from './service/test.service';

import { TestQuestionsComponent } from './test-questions/test-questions.component';
import { TimerComponent } from './timer/timer.component';
import { TestInfoComponent } from './test-info/test-info.component';


@NgModule({
  declarations: [
    TestQuestionsComponent,
    TimerComponent,
    TestInfoComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    HttpClientModule
  ],
  providers: [TestService]
})
export class TestModule { }
