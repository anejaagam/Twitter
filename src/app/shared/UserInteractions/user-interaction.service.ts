import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { user, UserInfo } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { arrayRemove, arrayUnion, doc, Firestore, getDoc, increment } from '@angular/fire/firestore';
import { UserInfo2 } from 'src/app/user-info2';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionService {
  router: any;

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
  FindFollowers(){
    const FollowingUsers: unknown[] = [];
    if(this.userInfo.following.length > 0){
    this.afs.collection("userInfo", (ref) => ref.where("username", "in", this.userInfo.following))
    .snapshotChanges()
    .subscribe((data) => {
      
      data.forEach((doc) => {
        const y:any = doc.payload.doc.data();
        
        FollowingUsers.push(y);
        
      });
      
    });
    
    return FollowingUsers;}else{return FollowingUsers;}
  
  }
  FindFollows(){
    const FollowedUsers: unknown[] = [];
   if(this.userInfo.follows.length > 0){this.afs.collection("userInfo", (ref) => ref.where("username", "in", this.userInfo.follows))
   .snapshotChanges()
   .subscribe((data) => {
     
     data.forEach((doc) => {
       const y:any = doc.payload.doc.data();
       
       FollowedUsers.push(y);
       
     });
     
   });
   
   return FollowedUsers;} else{return FollowedUsers;}
  
  }

  async goToPage(username:string){
    let userData :any;
    const userRef = doc(this.db,'userInfo', username);
    const userSnap = getDoc(userRef).then(
    (e)=>{
         userData = e.data();

        const UserInfo2: UserInfo2 = {
          name: userData.name,
          username: username,
          verified: false,
          followers: userData.followers,
          followed: userData.followed,
          NumberOfTweets: userData.NumberOfTweets,
          following: userData.following,
          follows: userData.follows,
          photoURL: userData.photoURL,
          coverPhotoUrl: userData.coverPhotoUrl,
          bio: userData.bio,
          TweetIds: userData.TweetIds,
          replies: userData.replies,
        };
        localStorage.setItem('userInfo2', JSON.stringify(UserInfo2)); 
        
      })
  }

  followUser(username:string){
    const userRef = this.afs.doc(`userInfo/${this.userInfo.username}`)
    const userRef2 = this.afs.doc(`userInfo/${username}`)
   
    this.userInfo.follows.push(username)
    userRef.update({follows:this.userInfo.follows, followed: increment(1)}).then(()=>{
      this.userInfo.followed = this.userInfo.followed + 1;
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
