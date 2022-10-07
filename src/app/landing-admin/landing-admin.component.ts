import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import User from '../interfaces/user.interface';
import { RequestsInterface } from '../interfaces/requests.interface';
import { interval } from 'rxjs';
import { RequestsCondoItemInterface } from '../interfaces/requests-condo-item.interface';
import { RequestsService } from '../services/requests.service';
@Component({
  selector: 'app-landing-admin',
  templateUrl: './landing-admin.component.html',
  styleUrls: ['./landing-admin.component.css']
})
export class LandingAdminComponent implements OnInit {

  constructor(private user_service:FirebaseService, private req_service:RequestsService) { }
  itemList:RequestsCondoItemInterface[]=[]

  public sub = interval(3000).subscribe(x =>{
    let uid = localStorage.getItem('current-user')
    if(uid != null){
     /*this.user_service.get_current_requests(uid).subscribe((val) => { console.log(val); this.untreated = val})*/
      this.req_service.sync_requests(uid).subscribe((val)=>{console.log("On init:"); this.itemList = val; console.log(this.itemList)})
    }
   });

  ngOnInit(): void {
    let uid = localStorage.getItem('current-user')
    if(uid != null){

    }
  }

}
