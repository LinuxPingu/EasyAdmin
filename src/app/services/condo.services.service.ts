import { Injectable } from '@angular/core';
import { CondosServiceService } from './condos.service.service';
import { Firestore, addDoc, collectionData} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs, doc, getDoc, deleteDoc  } from "firebase/firestore";
import { object } from 'rxfire/database';
import { from, map, Observable, of } from 'rxjs';
import { Condo } from '../interfaces/condo.interface';
import User from '../interfaces/user.interface';
import { convertSnaps } from './db-utils';
import { ServiceInterface } from '../interfaces/service.interface';
import { Form } from '@angular/forms';
import { CondoServiceItemInterface } from '../interfaces/condo-service-item.interface';

@Injectable({
  providedIn: 'root'
})
export class CondoServicesService {
   constructor(private condo_service:CondosServiceService, private firestore:Firestore,private angularFs:AngularFirestore) { }
   condos_by_owner:Condo[] = [];
   all_services:ServiceInterface[] =[]
   service_items:CondoServiceItemInterface[]= [];

   add_new_service(new_service:ServiceInterface){
     const serviceRef = collection(this.firestore,'services');
     return addDoc(serviceRef,new_service);
   }

   async get_user_condos(owner:string){
     let promise:Promise<Condo[]> = this.condo_service.get_user_condos(owner);
     promise.then((data) =>{this.condos_by_owner = data})
   }

   find_All_Services(condo_id:string): Observable<ServiceInterface[]>{
    return this.angularFs.collection('services', ref => ref.where('condo_id','==',condo_id)).get().pipe(map(result =>convertSnaps<ServiceInterface>(result)));
   }

   build_user_data(owner:string){
     this.get_user_condos(owner);
     if(this.all_services != null){
      this.condos_by_owner.forEach(cur_condo => {    
        if(cur_condo.id != null){
          this.find_All_Services(cur_condo.id).subscribe((val) => { 
            let new_bundle:CondoServiceItemInterface ={
              condo: cur_condo,
              services: val
            }
            console.log("Bundle here...")
            console.log(new_bundle)
            this.service_items.push(new_bundle);
          })
        }
      });
     }
   }

   cleanData(){
     this.condos_by_owner = []
     this.all_services=[]
     this.service_items=[]
   }

   get_current_services(owner:string):Observable<CondoServiceItemInterface[]>{
     this.build_user_data(owner);
     return of(this.service_items)
   }
}
