import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalNavbarComponent } from './global-navbar/global-navbar.component';
import { AppModule } from '../app.module';



@NgModule({
  declarations: [
    GlobalNavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[GlobalNavbarComponent]
})
export class NavbarModule { }
