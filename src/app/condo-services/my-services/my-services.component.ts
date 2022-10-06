import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Condo } from 'src/app/interfaces/condo.interface';
import { ServiceInterface } from 'src/app/interfaces/service.interface';
import { CondoServicesService } from '../../services/condo.services.service';
import { CondoServiceItemInterface } from 'src/app/interfaces/condo-service-item.interface';
@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {

  constructor(private condos_services:CondoServicesService) { }
  service_by_hash:CondoServiceItemInterface[]= [];

  public sub = interval(10000).subscribe(x =>{
    let uid = localStorage.getItem('current-user')
    if(uid != null){
     this.condos_services.get_current_services(uid).subscribe((val) => {this.service_by_hash = val})
     this.condos_services.cleanData()
    }
  });

  ngOnInit(): void {
    let uid = localStorage.getItem('current-user')
    if(uid != null){

    }
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
}
