export interface UserInfo2 {
    name: string | undefined;
    username: string;
    photoURL: string;
    coverPhotoUrl: string;
    verified : boolean;
    followers: any;
    followed: any;
    NumberOfTweets: number;
    bio: string;
    following: string[];
    follows: string[];
}
