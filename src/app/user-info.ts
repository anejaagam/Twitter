
export interface UserInfo {
    name: string | undefined;
    bday: string| undefined;
    email: string | undefined;
    username: string;
    photoURL?: string;
    coverPhotoUrl?: string;
    verified : boolean;
    followers: any;
    followed: any;
    NumberOfTweets: number;
    bio?: string;
    following: string[];
    follows: string[];
    TweetIds : any;
    bookmarks: any;
    replies: string[];
}
