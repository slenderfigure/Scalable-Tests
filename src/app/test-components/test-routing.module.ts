import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router'; 

import { TestQuestionsComponent } from './test-questions/test-questions.component';
import { TestInfoComponent } from './test-info/test-info.component';
import { TestResultsComponent } from './test-results/test-results.component';

import { TestQuestionGuard } from './test-question.guard';


const routes: Route[] = [
  { path: 'test/:testId', component: TestInfoComponent },
  { 
    path: 'test/:testId/:questionId', 
    component: TestQuestionsComponent,
    // canActivate: [TestQuestionGuard]
  },
  { path: 'test-results', component: TestResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
