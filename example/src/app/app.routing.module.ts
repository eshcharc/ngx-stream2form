import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleStreamComponent } from './components/simple-stream/simple-stream.component';
import { SimpleFormComponent } from './components/simple-form/simple-form.component';

const routes: Routes = [
  {
    path: 'simple-stream',
    component: SimpleStreamComponent
  },
  {
    path: 'simple-form',
    component: SimpleFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
