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
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { TweetService } from 'src/app/shared/tweetService/tweet.service';
import { UserInteractionService } from 'src/app/shared/UserInteractions/user-interaction.service';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/tweet';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  
  userInfo = JSON.parse(localStorage.getItem('userInfo')|| '{}');
  pfp: Observable<string | null>;
  userProfileURL = this.userInfo.userProfileURL;
  feedTweets: any;
  calledBefore: boolean;
  replies: any;
  feedTweets2: any;
  replyTweet:any;

  constructor(public authservice : AuthService,
    public storage: AngularFireStorage,
    public TweetService: TweetService,
    public userInter: UserInteractionService,
    public router: Router,
    public db: Firestore) { 
    const tweetseveryone: string | any = []
    
   
    this.feedTweets2 = TweetService.UserTweets(this.userInfo.username);
    this.feedTweets =  TweetService.FeedTweets(this.userInfo.username);
    
   
    
  }
  goToPage(username:string){
    this.userInter.goToPage(username).then(()=>{
      this.router.navigate(['other']);
    })
  }
  async getReplies(ReplyId: string){
    
    this.replies = this.TweetService.getReplies(ReplyId);

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
  ngOnInit(): void {
  }
  Getpfp (pfpURL: any): Observable<string | null | undefined> {
    let Tweetpfp: Observable<string|null | undefined>;
    const ref = this.storage.ref(pfpURL);
    Tweetpfp = ref.getDownloadURL();
    
      return Tweetpfp ;
    

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
}
