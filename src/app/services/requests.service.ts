import { Injectable } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import User from '../interfaces/user.interface';
import { RequestsInterface } from '../interfaces/requests.interface';
import { interval } from 'rxjs';
import { Firestore, addDoc, collectionData} from '@angular/fire/firestore';
import { collection, query, where, getDocs, doc, getDoc, QuerySnapshot  } from "firebase/firestore";
import { object } from 'rxfire/database';
import { Observable, of } from 'rxjs';
import { Condo } from '../interfaces/condo.interface';
import { CondosServiceService } from 'src/app/services/condos.service.service';
import { RequestsCondoItemInterface } from '../interfaces/requests-condo-item.interface';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { compileDeclareClassMetadata } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private user_service:FirebaseService,private condo_service:CondosServiceService,private firestore: Firestore) { }
  user_condos:Condo[]=[]
  requests:RequestsInterface[]=[]
  untreated:RequestsInterface[]=[]
  condo_users:User[]=[]
  itemList:RequestsCondoItemInterface[] =[]

  addRequest(req:RequestsInterface){
    const reqRef = collection(this.firestore,'requests');
    return addDoc(reqRef,req);
  }

   async set_req_id(request:RequestsInterface):Promise<RequestsInterface>{
    const userRef = collection(this.firestore,'users');
    const q = query(userRef, where("condo_id","==",request.condo_id), where("user_id","==",request.user_id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if(doc.get('condo_id')=== request.condo_id && doc.get('user_id') === request.user_id){
        request.request_id = doc.id.toString();
      }
    });
    return request
   }

  filter_list_by_condo(unfiltered:RequestsInterface[],condo_id:string):RequestsInterface[]{
     let filtered:RequestsInterface[] =[]
     let completed:RequestsInterface[] =[]

     unfiltered.forEach(element => {
      
      let p:Promise<RequestsInterface> = this.set_req_id(element)
      p.then(x =>{
        if(x.condo_id === condo_id){
          filtered.push(x);
        }
      }) 
    });

    console.log(`filtered size ${filtered.length}`)
    return filtered
  }

  async get_requests_by_condo(condo:Condo):Promise<RequestsInterface[]>{

    await console.log("On request by condo: ")
    await console.log(condo.id)
    let reqst:RequestsInterface[] =[]

    const userRef = collection(this.firestore,'requests');
    const q = query(userRef);
    const querySnapshot = await getDocs(q);
    console.log("Snap count: "+querySnapshot.size)

    let temp:RequestsInterface[]=[]
    querySnapshot.forEach(async (doc) => {
      let found:RequestsInterface ={
        request_id: doc.id.toString(),
        user_id: doc.get('user_id'),
        condo_id: String(doc.get('condo_id')),
        is_treated: doc.get('is_treated'),
        is_accepted: doc.get('is_accepted')
      }
      if(doc.get('condo_id') === condo.id){
        console.log(`Im doc val`)
        temp.push(found)
      }
    });
    
    console.log(`temp size ${temp.length}`)
    if(condo.id != null){
      reqst = this.filter_list_by_condo(temp,condo.id)
    }
    
    return reqst;
  }

  get_all():Observable<RequestsInterface[]>{
    const reqRef = collection(this.firestore,'requests')
    return collectionData(reqRef) as Observable<RequestsInterface[]>; 
  }

  async get_untreated_requests(owner:string){
    let p_condos:Promise<Condo[]> = this.condo_service.get_user_condos(owner);
    p_condos.then(values =>{ this.user_condos = values})
    this.user_condos.forEach(cur_condo => {
      console.log(`Going to condo: ${cur_condo.id}`)
      let obv_all_requests:Observable<RequestsInterface[]> = this.get_all();
      obv_all_requests.subscribe((g) =>{
          if(cur_condo.id != null){
            let tem:RequestsInterface[] = this.filter_list_by_condo(g,cur_condo.id)
            let item:RequestsCondoItemInterface ={
              condo: cur_condo,
              requests: tem
            }
            this.itemList.push(item)
         }
      }) 
    });
  }

  sync_requests(owner:string):Observable<RequestsCondoItemInterface[]>{
    this.itemList = []
    this.get_untreated_requests(owner);
    return of(this.itemList)
  }

}
