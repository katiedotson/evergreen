export interface Post {
  title: string;
  body: string;
  relevance: number;
  tagline: string;
  img: string;
  urlName: string;
  authorId: number;
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  interests: string[];
  savedPosts?: Post[];
  authorId?: number;
  location: string;
  bio: string;
  joinDate: Date;
  occupation: string;
  email: string;
  img: string;
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface UserData {
  id: string;
  platform: string;
  expiration: number;
}
