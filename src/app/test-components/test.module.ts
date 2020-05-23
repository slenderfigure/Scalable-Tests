import { NgModule } from '@angular/core';

import { TestRoutingModule } from './test-routing.module';
import { TestService } from './service/test.service';
import { SharedModule } from '../shared/shared.module';

import { TestQuestionsComponent } from './test-questions/test-questions.component';
import { TimerComponent } from './test-questions/timer/timer.component';
import { TestInfoComponent } from './test-info/test-info.component';
import { TestResultsComponent } from './test-results/test-results.component';
import { TestComponent } from './test.component';
import { AnswersReviewComponent } from './test-results/answers-review/answers-review.component';
import { ProgressBarComponent } from './test-questions/progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    TestQuestionsComponent,
    TimerComponent,
    TestInfoComponent,
    TestResultsComponent,
    TestComponent,
    AnswersReviewComponent,
    ProgressBarComponent
  ],
  imports: [
    TestRoutingModule,
    SharedModule
  ],
  providers: [TestService]
})
export class TestModule { }
