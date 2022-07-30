import { Observable } from "rxjs";

export interface Tweet {
    id?: any;
    username: string;
    Tweet: string;
    pfpURL: string;
    name: string;
    like: number;
    retweet: number;
    commentsNumber: number;
    comments: any;
    time?: any;
    timeStamp: any;
    likedBy: any;
    pfp?: Observable<string | null>;
}
