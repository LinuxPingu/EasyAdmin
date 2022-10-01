import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CondosListComponent } from './condos-list/condos-list.component';
import { MyCondosComponent } from './my-condos/my-condos.component';

const routes: Routes = [
  {
    path:'',
    component:MyCondosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondosRoutingModule { }
