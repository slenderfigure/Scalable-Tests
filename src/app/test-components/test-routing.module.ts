import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router'; 

import { TestComponent } from './test.component';
import { TestQuestionsComponent } from './test-questions/test-questions.component';
import { TestInfoComponent } from './test-info/test-info.component';
import { TestResultsComponent } from './test-results/test-results.component';

import { TestQuestionGuard } from './test-questions/can-activate.guard';
import { TestResultsGuard } from './test-results/test-results.guard';
import { CanDeactivateGuard } from './test-questions/can-deactivate.guard';


const routes: Route[] = [
  // { path: 'test', component: TestComponent },
  { path: 'test/:testId', component: TestInfoComponent },
  { 
    path: 'test/:testId/:questionId', 
    component: TestQuestionsComponent,
    canActivate: [TestQuestionGuard],
    // canDeactivate: [CanDeactivateGuard]
  },
  { 
    path: 'test-results', 
    component: TestResultsComponent,
    canActivate: [TestResultsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard],
})
export class TestRoutingModule { }
