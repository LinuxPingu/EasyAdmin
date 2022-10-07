import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Condo } from 'src/app/interfaces/condo.interface';
import { ServiceInterface } from 'src/app/interfaces/service.interface';
import { CondoServicesService } from '../../services/condo.services.service';
import { CondoServiceItemInterface } from 'src/app/interfaces/condo-service-item.interface';
import { CondosServiceService } from 'src/app/services/condos.service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {

  constructor(private condos_services:CondoServicesService, private condo_service:CondosServiceService) { }
  service_by_hash:CondoServiceItemInterface[]= [];
  user_condos:Condo[]=[]

  public sub = interval(1000).subscribe(x =>{
    let uid = localStorage.getItem('current-user')
    if(uid != null){
     this.condos_services.get_current_services(uid).subscribe((val) => {this.service_by_hash = val})
     this.condos_services.cleanData()
    }
  });
  

   isEditing:boolean =false;
   editing_service:string ="";
   editing_Condo:Condo ={
     email: '',
     isActive: false,
     location: '',
     name: '',
     owner_id: '',
     phone: ''
   }
   model:ServiceInterface ={
    condo_id: '',
    type_of_service: '',
    name: '',
    email: '',
    phone: '',
    is_all_day: true,
    starts: '',
    ends: '',
    service_id: ''
   }

  ngOnInit(): void {
    let uid = localStorage.getItem('current-user')
    if(uid != null){
      this.condo_service.get_user_condos(uid).then((data) =>{ this.user_condos = data})
    }
  }

  createService(contactForm:any){
   try {
    this.condos_services.add_new_service(this.model)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Service ${this.model.name} created! `,
      showConfirmButton: false,
      timer: 1500
    })
   } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
   }
  }

   editService(name:string, condo:Condo){
     this.isEditing = true;
     this.editing_service=name;
     this.editing_Condo=condo;
     let promise =  this.condos_services.get_service(name,condo);
     promise.then(x =>{ this.model = x})
   }

   sendEdit(contactForm:any){
     try {
      this.condos_services.edit_service(this.editing_service,this.editing_Condo,this.model)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Service ${this.model.name} updated! `,
        showConfirmButton: false,
        timer: 1500
       })
      let emptyCondo:Condo ={
        email: '',
        isActive: false,
        location: '',
        name: '',
        owner_id: '',
        phone: ''
      }

      let emptyService:ServiceInterface ={
        condo_id: '',
        type_of_service: '',
        name: '',
        email: '',
        phone: '',
        is_all_day: true,
        starts: '',
        ends: '',
        service_id: ''
       }

       this.isEditing = false;
       this.editing_service ="";
       this.editing_Condo=emptyCondo;
       this.model = emptyService
       
     } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
     }
   }
  
   deleteService(name:string, condo:Condo){
     console.log(`Here! ${name} and ${condo.id}`)
     try {
       this.condos_services.delete_service(name,condo);
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Service ${name} deleted! `,
        showConfirmButton: false,
        timer: 1500
       })
     } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
     }
   }

   public ngOnDestroy() {
     this.sub.unsubscribe();
   }
  
}
