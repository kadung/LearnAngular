import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponent } from './home/form-reactive/reactive-form.component';
import { FormComponent } from './home/form/form.component';
import { InputErrorComponent } from './shared/components/input-error/input-error.component';

import { HttpComponent } from './home/http/http.component';
import { HttpDirectComponent } from './home/http/http-direct/http-direct.component';
import { HttpServiceComponent } from './home/http/http-service/http-service.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinner } from './shared/components/loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home.component'

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
    LoadingSpinner,
    HomeComponent
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
