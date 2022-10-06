import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CondoServicesRoutingModule } from './condo-services-routing.module';
import { NavbarModule } from '../shared/navbar.module';
import { FormsModule } from '@angular/forms';
import { MyServicesComponent } from './my-services/my-services.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { ListServiceComponent } from './list-service/list-service.component';


@NgModule({
  declarations: [
    MyServicesComponent,
    AddServiceComponent,
    EditServiceComponent,
    ListServiceComponent
  ],
  imports: [
    CommonModule,
    CondoServicesRoutingModule,
    NavbarModule,
    FormsModule
  ]
})
export class CondoServicesModule { }
