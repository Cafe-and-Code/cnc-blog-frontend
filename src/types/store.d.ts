export interface IUserState {
  user: IUser;
}

export interface IUser {
  postId: IPost;
  userId: number;
}

export interface IPost {
  name: string;
}
