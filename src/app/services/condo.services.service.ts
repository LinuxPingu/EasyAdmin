import { Injectable } from '@angular/core';
import { CondosServiceService } from './condos.service.service';
import { Firestore, addDoc, collectionData} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
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

   async get_service(name:string,condo:Condo):Promise<ServiceInterface>{
    let completed_service:ServiceInterface = {
      service_id: '',
      condo_id: '',
      type_of_service: '',
      name: '',
      email: '',
      phone: '',
      is_all_day: false,
      starts: '',
      ends: ''
    }
    
    const q = query(collection(this.firestore,'services'),where('condo_id','==',condo.id),where('name','==',name))
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
      if(doc.get('name') === name && doc.get('condo_id') === condo.id){
        completed_service.service_id = doc.id.toString();
        completed_service.condo_id = doc.get('condo_id');
        completed_service.type_of_service = doc.get('type_of_service');
        completed_service.name = doc.get('name');
        completed_service.email = doc.get('email');
        completed_service.phone = doc.get('phone');
        completed_service.is_all_day = doc.get('is_all_day');
        completed_service.starts = doc.get('starts');
        completed_service.ends = doc.get('ends');
        console.log("Completed service!")
        console.log(completed_service);
      }
   });
    return completed_service   
   }
   
  async set_doc_id(service:ServiceInterface,condo:string):Promise<ServiceInterface>{
    const userRef = collection(this.firestore,'users');
    const q = query(userRef, where("name","==",service.name),where("condo_id","==",service.condo_id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if(doc.get('name') === service.name && doc.get('condo_id') === service.condo_id){
        service.service_id = doc.id.toString();
        console.log("Service completed: ")
        console.log(service)
      }
   });

   return service;
  }

    build_user_data(owner:string){
     this.get_user_condos(owner);
     if(this.all_services != null){
      this.condos_by_owner.forEach(cur_condo => {    
        if(cur_condo.id != null){
          this.find_All_Services(cur_condo.id).subscribe((val) => { 
            let services_with_id:ServiceInterface[]=[]
            val.forEach(element => {
              if(cur_condo.id != null){
               this.set_doc_id(element,cur_condo.id).then( (x)=>{services_with_id.push(x)})
              }
            });
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

   async set_document_id(name:string,condo:Condo):Promise<ServiceInterface>{
    let completed_service:ServiceInterface = {
      service_id: '',
      condo_id: '',
      type_of_service: '',
      name: '',
      email: '',
      phone: '',
      is_all_day: false,
      starts: '',
      ends: ''
    }
    
    const q = query(collection(this.firestore,'services'),where('condo_id','==',condo.id),where('name','==',name))
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
      if(doc.get('name') === name && doc.get('condo_id') === condo.id){
        completed_service.service_id = doc.id.toString();
        completed_service.condo_id = doc.get('condo_id');
        completed_service.type_of_service = doc.get('type_of_service');
        completed_service.name = doc.get('name');
        completed_service.email = doc.get('email');
        completed_service.phone = doc.get('phone');
        completed_service.is_all_day = doc.get('is_all_day');
        completed_service.starts = doc.get('starts');
        completed_service.ends = doc.get('ends');
        console.log("Completed service!")
        console.log(completed_service);
      }
   });
    return completed_service   
   }

   delete_service(name:string,condo:Condo){
     let prom = this.set_document_id(name,condo)
     prom.then((val)=>{
       console.log(`the id of ${name} is ${val.service_id}`)
       const condoDocRef = doc(this.firestore,`services/${val.service_id}`)
       return deleteDoc(condoDocRef);
     })
   }

   get_service_id(name:string,condo:Condo):string{
     let id:string =""
     let prom = this.set_document_id(name,condo)
     prom.then((x)=>{
        id = x.service_id
        console.log(`id service: ${x.service_id}`)
     })
     return id;
   }

   async edit_service(service_name:string,condo:Condo,new_Values:ServiceInterface){
    let prom = this.set_document_id(service_name,condo)
    prom.then((x)=>{
       console.log(`id service: ${x.service_id}`)
       this.angularFs.collection("services").doc(x.service_id).update({
        condo_id: new_Values.condo_id,
        type_of_service:new_Values.type_of_service,
        name:new_Values.name,
        email:new_Values.email,
        phone:new_Values.phone,
        is_all_day:new_Values.is_all_day,
        starts:new_Values.starts,
        ends:new_Values.ends
      })
    })
   }

   get_current_services(owner:string):Observable<CondoServiceItemInterface[]>{
     this.build_user_data(owner);
     return of(this.service_items)
   }
}
