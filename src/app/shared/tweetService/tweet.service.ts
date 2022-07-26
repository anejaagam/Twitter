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
  private tweetRef: AngularFirestoreCollection<Tweet>;
  tweet: Observable<Tweet[]>;
  model:Tweet;
  constructor(public afs: AngularFirestore) { 
    
  }
PostTweet(tweet: HTMLInputElement){
  let tweetString = tweet.value;
  this.tweetRef = this.afs.collection<Tweet>('Tweets');
  this.model = {
    username: this.userInfo.username,
    Tweet: tweetString,
    pfpURL: this.userInfo.photoURL,
    name: this.userInfo.name,
    like: 0,
    retweet: 0,
    commentsNumber: 0,
    comments:[]
  }
  this.tweetRef.add(this.model).then(()=>{
    window.location.reload();
  })
}

UserTweets(username: string){
  const userTweets: unknown[] = [];
  this.afs.collection("Tweets", (ref) => ref.where("username", "==", username))
  .snapshotChanges()
  .subscribe((data) => {
    
    data.forEach((doc) => {
      const y = doc.payload.doc.data();
      console.log(y);
      userTweets.push(y);
    });
    
  });
  return userTweets;
}


}
