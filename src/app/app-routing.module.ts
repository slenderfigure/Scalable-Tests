import { NgModule } from '@angular/core';
import { RouterModule, Route, PreloadAllModules } from '@angular/router'; 

import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Route[] = [
  { path: 'home', component: MainPageComponent },
  { path: 'user', loadChildren: () => import('./user-center/user-center.module').then(m => m.UserCenterModule) },
  {
    path: 'test',
    loadChildren: () => import('./test-components/test.module').then(m => m.TestModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },  
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { 
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled', 
      scrollPositionRestoration: 'disabled',
      onSameUrlNavigation: 'reload'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
