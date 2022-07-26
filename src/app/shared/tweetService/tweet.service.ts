import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Tweet } from 'src/app/tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  userInfo = JSON.parse(localStorage.getItem('userInfo')|| '{}');
  pfp: Observable<string | null>;
  private tweetRef: AngularFirestoreDocument<any>;
  tweet: Observable<Tweet[]>;
  model:Tweet;
  constructor(public afs: AngularFirestore) { 
    
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
    comments:[],
    time: new Date
  }
  this.tweetRef = this.afs.doc(`Tweets/${this.model.id}`);
  this.tweetRef.set(this.model,{
    merge: true,
  }).then(()=>{
    window.location.reload();
  });
}

UserTweets(username: string){
  const userTweets: unknown[] = [];
  this.afs.collection("Tweets", (ref) => ref.where("username", "==", username).orderBy("time", 'asc'))
  .snapshotChanges()
  .subscribe((data) => {
    
    data.forEach((doc) => {
      const y = doc.payload.doc.data();
      console.log(y);
      userTweets.push(y);
    });
    
  });
  console.log(userTweets)
  return userTweets;
}

DeleteTweet(id: any){
  let tweetId = id;
  this.tweetRef = this.afs.doc(`Tweets/${tweetId}`);
  this.tweetRef.delete().then(()=>{window.location.reload();})

}


}
