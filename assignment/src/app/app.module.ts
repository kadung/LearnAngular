import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponent } from './reactive-form/reactive-form.component';
import { FormComponent } from './form/form.component';
import { InputErrorComponent } from './shared/components/input-error/input-error.component';

import { HttpComponent } from './http/http.component';
import { HttpDirectComponent } from './http/http-direct/http-direct.component';
import { HttpServiceComponent } from './http/http-service/http-service.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveComponent,
    FormComponent,
    InputErrorComponent,
    HttpComponent,
    HttpDirectComponent,
    HttpServiceComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
