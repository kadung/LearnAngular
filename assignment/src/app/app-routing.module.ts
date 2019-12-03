import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveComponent } from './reactive-form/reactive-form.component';
import { FormComponent } from './form/form.component'
import { HttpComponent } from './http/http.component';
import { HttpDirectComponent } from './http/http-direct/http-direct.component';
import { HttpServiceComponent } from './http/http-service/http-service.component';
import { AuthComponent } from './auth/auth.component'

const routes: Routes = [
  {
    path: 'form',
    component: FormComponent,
    children: [
      {path: 'reactive', component: ReactiveComponent}
    ],
  },
  {
    path: 'http',
    component: HttpComponent,
    children:[
      { path: 'input-decorator', component: HttpDirectComponent },
      { path: 'share-service', component: HttpServiceComponent },
    ]
  },
  {
    path: 'signup',
    component: AuthComponent,
  },
  // Wildcard - remain path
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
