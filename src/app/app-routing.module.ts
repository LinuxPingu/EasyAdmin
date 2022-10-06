import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes=[
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'landing-page',
    component: LandingPageComponent
  },
  {
    path:'condos',
    loadChildren:() => import('./condos/condos.module').then(m => m.CondosModule)
  },{
    path:'my-services',
    loadChildren:() => import('./condo-services/condo-services.module').then(m => m.CondoServicesModule)
  }

];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
