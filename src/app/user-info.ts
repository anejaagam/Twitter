export interface UserInfo {
    name: string;
    bday: string;
    username: string;
    photoURL?: string;
    coverPhotoUrl?: string;
    verified : boolean;
    followers: number;
    followed: number;
    NumberOfTweets: number;
    bio?: string;
}
