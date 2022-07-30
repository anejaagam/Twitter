export interface SecondUserInfo {
    name: string;
    username: string;
    photoURL?: string;
    coverPhotoUrl?: string;
    verified : boolean;
    followers: number;
    followed: number;
    NumberOfTweets: number;
    bio?: string;
    following?: string[];
    followedBy?: string[];
}
