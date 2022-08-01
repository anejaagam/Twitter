import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Tweet } from 'src/app/tweet';
import {formatDate} from '@angular/common';
import { object } from 'rxfire/database';
import { doc, docData, Firestore, getDoc, waitForPendingWrites } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  userInfo = JSON.parse(localStorage.getItem('userInfo')|| '{}');
  pfp: Observable<string | null>;
  private tweetRef: AngularFirestoreDocument<any>;
  tweet: Observable<Tweet[]>;
  model:Tweet;
  constructor(public afs: AngularFirestore, @Inject(LOCALE_ID) private locale: string,
  public db : Firestore, public st: AngularFireStorage) { 
    
  }
PostTweet(tweet: HTMLInputElement){
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
  this.tweetRef.set(JSON.parse(JSON.stringify(this.model)),{
    merge: true,
  }).then(()=>{
    window.location.reload();
  });
}

UserTweets(username: string){
  const userTweets: unknown[] = [];
  let tweetLikedBy = []
  this.afs.collection("Tweets", (ref) => ref.where("username", "==", username).orderBy("time", 'asc'))
  .snapshotChanges()
  .subscribe((data) => {
    
    data.forEach((doc) => {
      const y:any = doc.payload.doc.data();
      
      userTweets.push(y);
      
    });
    
  });
  
  return userTweets;
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

Getpfp (pfpURL: any): Observable<string | null> {
  let Tweetpfp: Observable<string|null>;
  const ref = this.st.ref(pfpURL);
  Tweetpfp = ref.getDownloadURL();
  console.log(pfpURL);
  return Tweetpfp;
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
        console.log(tweetLikedBy ,currentLikes);
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
  
}



