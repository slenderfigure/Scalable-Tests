import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router'; 
import { TestQuestionsComponent } from './test-questions/test-questions.component';


const routes: Route[] = [
  { path: 'test/:id', component: TestQuestionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
