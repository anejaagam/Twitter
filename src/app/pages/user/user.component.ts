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
import { doc, updateDoc } from '@firebase/firestore';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';

import { TweetService } from 'src/app/shared/tweetService/tweet.service';


                   


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
  


  constructor(public authservice : AuthService,
    public storage :AngularFireStorage,
    public afs : AngularFirestore,
    public router: Router,
    public Tweet : TweetService) { 
      console.log(this.userInfo.followed)
      
      this.userTweets = Tweet.UserTweets(this.userInfo.username, this.userInfo.TweetIds);
      
      
      
      
  }
  AngularRef:AngularFireStorageReference;
  task:AngularFireUploadTask;


  SendTweetClick(newTweet: HTMLInputElement,){
    
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
   
    getDownloadURL(ref(getStorage(),this.userInfo.photoURL)).then((url)=>{
      this.userInfo.photoURL = url;
      userRef.update({bio: this.userInfo.bio, name: this.userInfo.name, photoURL: url, coverPhotoUrl: this.userInfo.coverPhotoUrl}).then(()=>{getDownloadURL(ref(getStorage(),this.userInfo.coverPhotoUrl)).then((url)=>{
        this.userInfo.coverPhotoUrl = url;
        userRef.update({coverPhotoUrl: url}).then(()=>{localStorage.setItem('userInfo', JSON.stringify(this.userInfo));window.location.reload();});
      })});
    })
    
    


  }
  refresh(){
    window.location.reload();
  }
  ngOnInit(): void {
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
