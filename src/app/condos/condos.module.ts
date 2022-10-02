import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CondosRoutingModule } from './condos-routing.module';
import { CondosListComponent } from './condos-list/condos-list.component';
import { MyCondosComponent } from './my-condos/my-condos.component';
import { NavbarModule } from '../shared/navbar.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    MyCondosComponent,
    CondosListComponent
  ],
  imports: [
    CommonModule,
    CondosRoutingModule,
    NavbarModule,
    FormsModule
  ]
})
export class CondosModule { }
