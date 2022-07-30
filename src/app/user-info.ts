import { Observable } from "rxjs";

export interface UserInfo {
    name: string;
    bday: string;
    username: string;
    photoURL?: any;
    coverPhotoUrl?: any;
    verified : boolean;
    followers: number;
    followed: number;
    NumberOfTweets: number;
    bio?: string;
    following?: string[];
    followedBy?: string[];
}
