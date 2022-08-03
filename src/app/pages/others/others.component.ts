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
import { UserInteractionService } from 'src/app/shared/UserInteractions/user-interaction.service';


                   


@Component({
  selector: 'app-user',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {
  userInfo2 = JSON.parse(localStorage.getItem('userInfo2')|| '{}');
  userInfo = JSON.parse(localStorage.getItem('userInfo')|| '{}');
  pfp: Observable<string | null>;
  banner: Observable<string | null>;
  userTweets: any;
  


  constructor(public authservice : AuthService,
    public storage :AngularFireStorage,
    public afs : AngularFirestore,
    public router: Router,
    public Tweet : TweetService,
    public userInter: UserInteractionService) { 
      console.log(this.userInfo2.username)
      const user = localStorage.getItem('ExploreUsername');
      this.userTweets = Tweet.UserTweets(this.userInfo2.username);
      if (this.userInfo2.username != user){
        this.userInfo2 = JSON.parse(localStorage.getItem('userInfo2')|| '{}');
      }
      
      
      
      
  }
  AngularRef:AngularFireStorageReference;
  task:AngularFireUploadTask;


  SendTweetClick(newTweet: HTMLInputElement,){
    
  }

  
  uploadPfp(event:any){
    const id = `${this.userInfo2.username}/pfp`;
    this.AngularRef = this.storage.ref(id).child('pfp.jpg');
    this.task = this.AngularRef.put(event.target.files[0]);
    this.userInfo2.photoURL = `${this.userInfo2.username}/pfp/pfp.jpg`;
  }
  uploadbanner(event:any){
    const id = `${this.userInfo2.username}/banner`;
    this.AngularRef = this.storage.ref(id).child('banner.jpg');
    this.task = this.AngularRef.put(event.target.files[0]);
    this.userInfo2.coverPhotoUrl = `${this.userInfo2.username}/banner/banner.jpg`;
  }
  EditUserClick(editName:HTMLInputElement,newBio:HTMLInputElement){
    this.userInfo2.bio = newBio.value;
    this.userInfo2.name = editName.value;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `userInfo/${this.userInfo2.username}`
    );
   
    getDownloadURL(ref(getStorage(),this.userInfo2.photoURL)).then((url)=>{
      this.userInfo2.photoURL = url;
      userRef.update({bio: this.userInfo2.bio, name: this.userInfo2.name, photoURL: url, coverPhotoUrl: this.userInfo2.coverPhotoUrl}).then(()=>{getDownloadURL(ref(getStorage(),this.userInfo2.coverPhotoUrl)).then((url)=>{
        this.userInfo2.coverPhotoUrl = url;
        userRef.update({coverPhotoUrl: url}).then(()=>{localStorage.setItem('userInfo', JSON.stringify(this.userInfo2));window.location.reload();});
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
  userProfileURL = this.userInfo2.userProfileURL;
}
