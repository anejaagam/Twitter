import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { TweetService } from 'src/app/shared/tweetService/tweet.service';
import { UserInteractionService } from 'src/app/shared/UserInteractions/user-interaction.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  userInfo = JSON.parse(localStorage.getItem('userInfo')|| '{}');
  pfp: Observable<string | null>;
  userProfileURL = this.userInfo.userProfileURL;
  feedTweets: any;
  users: any;
  follows = this.userInfo.follows;
  
  constructor(public authservice : AuthService,
    public storage: AngularFireStorage,
    public TweetService: TweetService,
    public userInter: UserInteractionService,
    public afs: AngularFirestore ) { 
   
    console.log(this.userInfo.follows)
  }

  findUser(explore:HTMLInputElement){
    const demand: string = explore.value;
    this.users = this.userInter.FindUser(demand);

  }
  userTweet(username:string){
    const userTweets: any[] = []
    this.afs.collection("Tweets", (ref) => ref.where("username", "==", username))
    .snapshotChanges()
    .subscribe((data) => {
      this.feedTweets = [];
      data.forEach((doc) => {
        const y:any = doc.payload.doc.data();
       
        this.feedTweets.push(y);
        
      });
      
    });
    return userTweets
  }
  findTweet(explore: HTMLInputElement){
    
    this.afs.collection("Tweets", (ref) => ref.where("Tweet", "==", explore.value))
    .snapshotChanges()
    .subscribe((data) => {
      this.feedTweets = [];
      data.forEach((doc) => {
        const y:any = doc.payload.doc.data();
       
        this.feedTweets.push(y);
        
      });
      
    });
    
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
}
