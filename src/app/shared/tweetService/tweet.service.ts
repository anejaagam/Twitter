import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Tweet } from 'src/app/tweet';
import {formatDate} from '@angular/common';
import { object } from 'rxfire/database';
import { arrayRemove, arrayUnion, doc, docData, Firestore, getDoc, getDocs, waitForPendingWrites } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref, getDownloadURL } from '@angular/fire/storage';
import { push } from '@firebase/database';
import { analyticInstance$ } from '@angular/fire/analytics';
import { collection, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  userInfo = JSON.parse(localStorage.getItem('userInfo')|| '{}');
  pfp: Observable<string | null>;
  private tweetRef: AngularFirestoreDocument<any>;
  tweet: Observable<Tweet[]>;
  model:Tweet;
  tweetIds: any = this.userInfo.tweetIds;
  constructor(public afs: AngularFirestore, @Inject(LOCALE_ID) private locale: string,
  public db : Firestore, public st: AngularFireStorage,) { 
    
    
  }
async PostTweet(tweet: HTMLInputElement){
  let tweetString = tweet.value;
  
  this.model = {
    id : this.afs.createId(),
    username: this.userInfo.username,
    Tweet: tweetString,
    pfpURL: this.userInfo.photoURL,
    name: this.userInfo.name,
    like: 0,
    retweet: 0,
    commentsNumber: 0,
    comments:['Twitter'],
    time: new Date,
    timeStamp: formatDate(Date.now(),'yyyy-MM-dd',this.locale),
    likedBy: ['Twitter']
  }
  this.tweetRef = this.afs.doc(`Tweets/${this.model.id}`);
  this.userInfo.TweetIds.push(this.model.id);
  
  this.tweetRef.set(JSON.parse(JSON.stringify(this.model)),{
    merge: true,
  }).then(()=>{
    getDownloadURL(ref(getStorage(),this.userInfo.photoURL)).then((url)=>{
      this.tweetRef.update({pfpURL: url }).then(()=>{
        const userRef = this.afs.doc(`userInfo/${this.userInfo.username}`)
        userRef.update({TweetIds: arrayUnion(this.model.id)}).then(()=>{
          
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
          window.location.reload();})
      });
    })
  
  
    
  });
}

getIMGDownloadURL(pfp: any): any{
  const URL: string[] = []
  getDownloadURL(ref(getStorage(),pfp)).then((url)=>{
    URL.push(url);
    return URL;
  })
  
  
}
 /* GetTweetIds(){
  const following: any[] = [];
  let tweet: any;
  const usernameList: any[] = this.userInfo.follows;
  const tweetRef = collection(this.db, "Tweets");
  let ids: any = [];
  
  const q = query(tweetRef, where("username","in", usernameList));
  const querySnapshot = getDocs(q).then(snapshot =>{snapshot.forEach((e)=>{
    tweet = e.data();
    ids.push(tweet.id);
  })})
  for(let id of this.userInfo.TweetIds){
    if(!(ids.includes(id))){
     ids.push(id);
    }
   }
  
  
 
  return ids;
  
} */
 FeedTweets(username: string){
  const userTweets: unknown[] = [];
  let tweetLikedBy = []
  
  const following: any[] = []
  const usernameList: any = following.concat(this.userInfo.follows,username)
  if(usernameList.length > 1){
    this.afs.collection("Tweets", (ref) => ref.where("username", "in", usernameList).orderBy("time", 'desc'))
  .snapshotChanges()
  .subscribe((data) => {
    
    data.forEach((doc) => {
      const y:any = doc.payload.doc.data();
      
      userTweets.push(y);
      
    });
    
  });} else{
    this.afs.collection("Tweets", (ref) => ref.where("username", "==", username).orderBy("time", 'desc'))
  .snapshotChanges()
  .subscribe((data) => {
    
    data.forEach((doc) => {
      const y:any = doc.payload.doc.data();
      
      userTweets.push(y);
      
    });
    
  });
  }
  
  

  
  
  return userTweets;
}

UserTweets(username:string){
  const userTweets: unknown[] = []
  this.afs.collection("Tweets", (ref) => ref.where("id", "in", this.userInfo.TweetIds).orderBy("time", 'desc'))
  .snapshotChanges()
  .subscribe((data) => {
    
    data.forEach((doc) => {
      const y:any = doc.payload.doc.data();
      
      userTweets.push(y);
      
    });
    
  });
  return userTweets;
}
followerTweets(){
  
  
}
TweetContTweets(tweetCont: string){
  const Tweets: unknown[] = [];
  let tweetLikedBy = []
  this.afs.collection("Tweets", (ref) => ref.where("Tweet", "<=", tweetCont))
  .snapshotChanges()
  .subscribe((data) => {
    
    data.forEach((doc) => {
      const y:any = doc.payload.doc.data();
      
      Tweets.push(y);
      
    });
    
  });
  
  return Tweets;
}

DeleteTweet(id: any){
  let tweetId = id;
  this.tweetRef = this.afs.doc(`Tweets/${tweetId}`);
  this.tweetRef.delete().then(()=>{window.location.reload();})

}

GetTweet(id:any){
  let tweet:any;
  let tweetLikedBy = []
  const TweetRef: AngularFirestoreDocument<any> = this.afs.doc(
    `Tweets/${id}`
  );
   
 
  return TweetRef.get();
}



LikeDislikeTweet(id: any){
 let tweet:any;
  let tweetLikedBy: string[] = [];
  let currentLikes: number= 0;
  
  const TweetRef = doc(this.db,'Tweets', id);
  const TweetSnap = getDoc(TweetRef).then(
    (e)=>{
        tweet = e.data();
        currentLikes = tweet.like;
        tweetLikedBy = tweet.likedBy;
       
        if(tweetLikedBy.includes(this.userInfo.username)){
          currentLikes = currentLikes -1;
          var i = tweetLikedBy.indexOf(this.userInfo.username);
          tweetLikedBy.splice(i,1);
        }else{
          currentLikes = currentLikes + 1;
          tweetLikedBy.push(this.userInfo.username);
        }

        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
          `Tweets/${id}`
        );
        userRef.update({like: currentLikes, likedBy: tweetLikedBy}).then(()=>{
          window.location.reload();
        })
    })
  }
  RepostTweet(id: string){
    let tweetIds = this.userInfo.TweetIds;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `userInfo/${this.userInfo.username}`
    );
  
    userRef.update({TweetIds: arrayUnion(id)}).then(()=>{
      this.userInfo.TweetIds.push(id);
      localStorage.setItem('userInfo',JSON.stringify(this.userInfo));
      window.location.reload();
    })
  }
  unRepostTweet(id: string){
    let tweetIds = this.userInfo.TweetIds;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `userInfo/${this.userInfo.username}`
    );
  
    userRef.update({TweetIds: arrayRemove(id)}).then(()=>{
      const i = this.userInfo.TweetIds.indexOf(id); 
      this.userInfo.TweetIds.splice(i,1);
      localStorage.setItem('userInfo',JSON.stringify(this.userInfo));
      window.location.reload();
    })
  }
}



