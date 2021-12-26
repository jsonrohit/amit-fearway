import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeshboardComponent } from './deshboard/deshboard.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'deshboard',
    pathMatch:'full',
  },
  {
    path:'deshboard',
    component:DeshboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
