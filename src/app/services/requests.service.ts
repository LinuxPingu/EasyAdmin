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

  async get_requests_by_condo(condo:Condo):Promise<RequestsInterface[]>{
    let reqst:RequestsInterface[] =[]
    const userRef = collection(this.firestore,'requests');
    const q = query(userRef, where("condo_id","==",condo.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if(doc.get('condo_id')=== condo.id){
        let found:RequestsInterface ={
          request_id: doc.id.toString(),
          user_id: doc.get('user_id'),
          condo_id: doc.get('condo_id'),
          is_treated: doc.get('is_treated'),
          is_accepted: doc.get('is_accepted')
        }
        console.log("Request")
        console.log(found)
        reqst.push(found);
      }
   });
    
    return reqst;
  }

  async get_untreated_requests(owner:string){
    let p_condos:Promise<Condo[]> = this.condo_service.get_user_condos(owner);
    p_condos.then(values =>{ this.user_condos = values})
    this.user_condos.forEach(cur_condo => {
      let p_req:Promise<RequestsInterface[]> = this.get_requests_by_condo(cur_condo)
      let item:RequestsCondoItemInterface ={
        condo: cur_condo,
        requests: []
      }
      p_req.then(requests =>{console.log(requests); item.requests = requests})
      this.itemList.push(item);
    });
  }

  sync_requests(owner:string):Observable<RequestsCondoItemInterface[]>{
    this.get_untreated_requests(owner);
    return of(this.itemList)
  }

}
