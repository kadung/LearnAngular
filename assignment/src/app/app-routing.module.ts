import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveComponent } from './reactive-form/reactive-form.component';
import { FormComponent } from './form/form.component'

const routes: Routes = [
  {
    path: 'form',
    component: FormComponent,
    children: [
      {path: 'reactive', component: ReactiveComponent}
    ],
  },
  // Wildcard - remain path
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
