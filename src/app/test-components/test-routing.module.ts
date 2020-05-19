import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router'; 
import { TestQuestionsComponent } from './test-questions/test-questions.component';
import { TestInfoComponent } from './test-info/test-info.component';


const routes: Route[] = [
  { path: 'test', component: TestInfoComponent },
  { path: 'test/:id', component: TestQuestionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
