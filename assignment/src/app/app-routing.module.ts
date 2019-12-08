import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveComponent } from './home/form-reactive/reactive-form.component';
import { FormComponent } from './home/form/form.component'
import { HttpComponent } from './home/http/http.component';
import { HttpDirectComponent } from './home/http/http-direct/http-direct.component';
import { HttpServiceComponent } from './home/http/http-service/http-service.component';
import { AuthComponent } from './auth/auth.component'
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'form',
        component: FormComponent,
        children: [
          { path: 'reactive', component: ReactiveComponent }
        ],
      },
      {
        path: 'http',
        component: HttpComponent,
        children: [
          { path: 'input-decorator', component: HttpDirectComponent },
          { path: 'share-service', component: HttpServiceComponent },
        ]
      },
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  // Wildcard - remain path
  // { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
