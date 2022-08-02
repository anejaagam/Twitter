export interface SecondUser {
    name: string | undefined;
    username: string;
    photoURL?: string;
    coverPhotoUrl?: string;
    verified : boolean;
    followers: number;
    followed: number;
    NumberOfTweets: number;
    bio?: string;
    
}
