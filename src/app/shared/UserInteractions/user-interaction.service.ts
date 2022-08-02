import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { arrayRemove, arrayUnion, Firestore, increment } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionService {

  constructor(public afs: AngularFirestore, @Inject(LOCALE_ID) private locale: string,
  public db : Firestore, public st: AngularFireStorage,) { }
  userInfo = JSON.parse(localStorage.getItem('userInfo')|| '{}');
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

  followUser(username:string){
    const userRef = this.afs.doc(`userInfo/${this.userInfo.username}`)
    const userRef2 = this.afs.doc(`userInfo/${username}`)
   
    this.userInfo.follows.push(username)
    userRef.update({follows:this.userInfo.follows, followed: increment(1)}).then(()=>{
      this.userInfo.followed +=1;
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      userRef2.update({following: arrayUnion(this.userInfo.username), followers: increment(1)}).then(()=>{window.location.reload();})
    })

  }
  unfollowUser(username:string){
    const userRef = this.afs.doc(`userInfo/${this.userInfo.username}`)
    const userRef2 = this.afs.doc(`userInfo/${username}`)
   
    let follows: string[] = this.userInfo.follows;
    if(follows.includes(username)){
      const i = follows.indexOf(username);
      follows.splice(i,1);
      this.userInfo.follows = follows;
      userRef.update({follows:follows, followed: increment(-1)}).then(()=>{
        this.userInfo.followed -=1;
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        userRef2.update({following: arrayRemove(this.userInfo.username), followers: increment(-1)}).then(()=>{window.location.reload();})
      })
    }
    
  }
}
