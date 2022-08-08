import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Notif } from 'src/app/notif';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  userInfo = JSON.parse(localStorage.getItem('userInfo')|| '{}');
  pfp: Observable<string | null>;
  model: Notif;

  constructor(public afs: AngularFirestore,
  public db : Firestore, public st: AngularFireStorage) { }
  
  sendNotif(to: string, action: string){
    let notifAction: string = "";
    const today = Timestamp.fromDate(new Date());
    switch(action){
      case "like":
        notifAction = "liked your tweet";
        break;
      case "repost":
        notifAction = "reposted your tweet";
        break;
      case "reply":
        notifAction = "replied to your tweet";
        break;
      case "bookmark":
        notifAction = "bookmarked your tweet";
        break;
      case "follow":
        notifAction = "followed you";
        break;
      default:
        break;
    }
    this.model = {
      notifId: this.afs.createId(),
      fromName: this.userInfo.name,
      from:this.userInfo.username,
      to:to,
      action:notifAction,
      photoURL: this.userInfo.photoURL,
      notifdate: today,
    }

    const NotifRef: any =  this.afs.doc(`Notifications/${this.model.notifId}`)
    NotifRef.set(JSON.parse(JSON.stringify(this.model)),{
      merge: true,
    }).then(()=>{console.log("Notified User")})
  }

  getUserNotif(){
    const userNotifs: any[] = []
    this.afs.collection("Notifications", (ref) => ref.where("to", "==", this.userInfo.username).orderBy("notifdate", 'asc'))
    .snapshotChanges()
    .subscribe((data) => {
      
      data.forEach((doc) => {
        const y:any = doc.payload.doc.data();
        
        userNotifs.push(y);
        
      });
      
    });

    return userNotifs;
  }
}
