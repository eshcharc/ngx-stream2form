import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleStreamComponent } from './components/simple-stream/simple-stream.component';
import { SimpleFormComponent } from './components/simple-form/simple-form.component';
import { ValidatedFormComponent } from './components/validated-form/validated-form.component';

const routes: Routes = [
  {
    path: 'simple-stream',
    component: SimpleStreamComponent
  },
  {
    path: 'simple-form',
    component: SimpleFormComponent
  },
  {
    path: 'validated-form',
    component: ValidatedFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
