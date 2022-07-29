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

  constructor(public authservice : AuthService,
    public storage: AngularFireStorage,
    public TweetService: TweetService) { 
    const ref = this.storage.ref(this.userInfo.photoURL);
    this.pfp = ref.getDownloadURL();
    this.feedTweets = TweetService.UserTweets(this.userInfo.username);
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
