import { Component, OnInit } from '@angular/core';
import { Condo } from 'src/app/interfaces/condo.interface';
import { CondosServiceService } from 'src/app/services/condos.service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-my-condos',
  templateUrl: './my-condos.component.html',
  styleUrls: ['./my-condos.component.css']
})
export class MyCondosComponent implements OnInit {

  constructor(private condo_service:CondosServiceService) { }

  model:Condo ={
    email: '',
    isActive: false,
    location: '',
    name: '',
    owner_id: '',
    phone: ''
  }

  isEditing:boolean = false;

  ngOnInit(): void {
  }

  createCondo(contactForm:any){
    try {
      let uid = localStorage.getItem('current-user')
      if(uid != null){
        this.model.owner_id = uid
        this.condo_service.addNewCondo(this.model);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Condo ${this.model.name} created! `,
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }
}
