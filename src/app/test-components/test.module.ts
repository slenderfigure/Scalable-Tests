import { NgModule } from '@angular/core';

import { TestRoutingModule } from './test-routing.module';
import { TestService } from './service/test.service';
import { SharedModule } from '../shared/shared.module';

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
    TestRoutingModule,
    SharedModule
  ],
  providers: [TestService]
})
export class TestModule { }
