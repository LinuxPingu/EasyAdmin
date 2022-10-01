import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData} from '@angular/fire/firestore';
import { collection, query, where, getDocs, doc, getDoc  } from "firebase/firestore";
import { object } from 'rxfire/database';
import { Observable } from 'rxjs';
import User from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  addNewUser(user:User){
    const userRef = collection(this.firestore,'users');
    return addDoc(userRef,user);
  }

  async getUserByEmail(email:string):Promise<User>{

    let foundUser:User ={
      userEmail: "",
      userPassword: "",
      username: "",
      fullName: "",
      isAdmin: false
    };

    const userRef = collection(this.firestore,'users');
    const q = query(userRef, where("userEmail","==",email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if(doc.get('userEmail')=== email){
        foundUser.userID = doc.id.toString();
        foundUser.username = doc.get('username');
        foundUser.fullName = doc.get('fullName');
        foundUser.userEmail = doc.get('userEmail');
        foundUser.userPassword = doc.get('userPassword')
        foundUser.isAdmin = doc.get('isAdmin');
      }
   });
   
   return foundUser;
  }

  getUsers():Observable<User[]>{
    const userRef = collection(this.firestore,'users');
    return collectionData(userRef,{idField:'userID'}) as Observable<User[]>;
  }

  

}
