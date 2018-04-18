import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { SimpleStreamComponent } from './components/simple-stream/simple-stream.component';
import { SimpleFormComponent } from './components/simple-form/simple-form.component';
import { ValidatedFormComponent } from './components/validated-form/validated-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemotelyChangingFormComponent } from './components/remotely-changing-form/remotely-changing-form.component';


@NgModule({
  declarations: [
    AppComponent,
    SimpleStreamComponent,
    SimpleFormComponent,
    ValidatedFormComponent,
    RemotelyChangingFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
