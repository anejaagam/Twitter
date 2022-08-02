import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionService {

  constructor(public afs: AngularFirestore, @Inject(LOCALE_ID) private locale: string,
  public db : Firestore, public st: AngularFireStorage,) { }

  FindUser(username : string){
    const users: unknown[] = [];
    
  this.afs.collection("userInfo", (ref) => ref.where("username", "==", username))
  .snapshotChanges()
  .subscribe((data) => {
    
    data.forEach((doc) => {
      const y:any = doc.payload.doc.data();
      
      users.push(y);
      
    });
    
  });
  
  return users;
  }
}
