import { Component, OnInit } from '@angular/core';
import { Condo } from 'src/app/interfaces/condo.interface';
@Component({
  selector: 'app-my-condos',
  templateUrl: './my-condos.component.html',
  styleUrls: ['./my-condos.component.css']
})
export class MyCondosComponent implements OnInit {

  constructor() { }

  model:Condo ={
    condoID: '',
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

  }
}
