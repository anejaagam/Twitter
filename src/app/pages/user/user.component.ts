import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AngularFireStorage, AngularFireStorageModule, AngularFireStorageReference, AngularFireUploadTask, GetDownloadURLPipe } from '@angular/fire/compat/storage'
import { getStorage, ref, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { updateDoc } from '@firebase/firestore';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { ResolveEnd, Router } from '@angular/router';

import { TweetService } from 'src/app/shared/tweetService/tweet.service';
import { UserInteractionService } from 'src/app/shared/UserInteractions/user-interaction.service';
import { Tweet } from 'src/app/tweet';
import { doc, Firestore, getDoc, waitForPendingWrites } from '@angular/fire/firestore';

                   


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userInfo = JSON.parse(localStorage.getItem('userInfo')|| '{}');
  pfp: Observable<string | null>;
  banner: Observable<string | null>;
  userTweets: any;
  follows = this.userInfo.follows;
  following = this.userInfo.following;
  FollowingUsers: any;
  FollowedUsers: any;
  replies: any;
  replyTweet:any;
  pagelink:string = "tweets";
  userTweetsNReplies:any;
  userLikes: any;

  constructor(public authservice : AuthService,
    public storage :AngularFireStorage,
    public afs : AngularFirestore,
    public router: Router,
    public Tweet : TweetService,
    public userInter: UserInteractionService,
    public db: Firestore) { 
      console.log(this.userInfo.followed)
      
      this.userTweets = Tweet.UserTweets(this.userInfo.username, this.userInfo.TweetIds);
      this.userTweetsNReplies = Tweet.UserTweetsNReply(this.userInfo.username, this.userInfo.TweetIds);
      this.userLikes = Tweet.UserLikedTweets(this.userInfo.username, this.userInfo.TweetIds);
      this.FollowingUsers = userInter.FindFollowers();
      this.FollowedUsers = userInter.FindFollows();
      
      
      
      
  }
  AngularRef:AngularFireStorageReference;
  task:AngularFireUploadTask;
  getReplies(ReplyId: string){
    
    this.replies = this.Tweet.getReplies(ReplyId);

    let tweet:any;
  let tweetLikedBy = []
  const userRef = doc(this.db,'Tweets', ReplyId);
  const userSnap = getDoc(userRef).then((e)=>{
    tweet = e.data();
    const Tweet: Tweet = {
      id: tweet.id,
      username: tweet.username,
      postedBy: tweet.postedBy,
      Tweet: tweet.Tweet,
      pfpURL: tweet.pfpURL,
      name: tweet.name,
      like: tweet.like,
      retweet: tweet.retweet,
      commentsNumber: tweet.commentsNumber,
      comments: tweet.comments,
      timeStamp: tweet.timeStamp,
      likedBy: tweet.likedBy
    }
    this.replyTweet = Tweet;
  })
    
  }

  
  
  uploadPfp(event:any){
    const id = `${this.userInfo.username}/pfp`;
    this.AngularRef = this.storage.ref(id).child('pfp.jpg');
    this.task = this.AngularRef.put(event.target.files[0]);
    this.userInfo.photoURL = `${this.userInfo.username}/pfp/pfp.jpg`;
  }
  uploadbanner(event:any){
    const id = `${this.userInfo.username}/banner`;
    this.AngularRef = this.storage.ref(id).child('banner.jpg');
    this.task = this.AngularRef.put(event.target.files[0]);
    this.userInfo.coverPhotoUrl = `${this.userInfo.username}/banner/banner.jpg`;
  }
  EditUserClick(editName:HTMLInputElement,newBio:HTMLInputElement){
    this.userInfo.bio = newBio.value;
    this.userInfo.name = editName.value;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `userInfo/${this.userInfo.username}`
    );
    const userRef2: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${this.userInfo.uid}`
    );
    userRef2.update({photoURL: this.userInfo.photoURL}).then(()=>{ getDownloadURL(ref(getStorage(),this.userInfo.photoURL)).then((url)=>{
      this.userInfo.photoURL = url;
      userRef.update({bio: this.userInfo.bio, name: this.userInfo.name, photoURL: url, coverPhotoUrl: this.userInfo.coverPhotoUrl}).then(()=>{getDownloadURL(ref(getStorage(),this.userInfo.coverPhotoUrl)).then((url)=>{
        this.userInfo.coverPhotoUrl = url;
        userRef.update({coverPhotoUrl: url}).then(()=>{localStorage.setItem('userInfo', JSON.stringify(this.userInfo));window.location.reload();});
      })});
    })})
   
  }
  goToPage(username:string){
    this.userInter.goToPage(username).then(()=>{
      this.router.navigate(['other']);
    })
  }
  refresh(){
    window.location.reload();
  }
  ngOnInit(): void {
  }

  onButtonGroupClick($event: { target: any; srcElement: any; }){
    let clickedElement = $event.target || $event.srcElement;

    if( clickedElement.nodeName === "BUTTON" ) {

      let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active-rn");
      // if a Button already has Class: .active
      if( isCertainButtonAlreadyActive ) {
        isCertainButtonAlreadyActive.classList.remove("active-rn");
      }

      clickedElement.className += " active-rn";
    }

  }
  setPage(pageLink:string){
    this.pagelink = pageLink;
  }
  
  faBell = faBell;
  faTwitter = faTwitter;
  faHome = faHome;
  faSearch = faSearch;
  faEnvelope = faEnvelope;
  faBookmark = faBookmark;
  faUser = faUser;
  faComment = faComment;
  faHeart = faHeart;
  faUpload = faUpload;
  faRetweet = faRetweet;
  faTrash = faTrash;
  userProfileURL = this.userInfo.userProfileURL;
}
