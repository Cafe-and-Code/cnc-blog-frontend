export interface ICreateAccountType {
  username: string;
  password: string | number;
  confirmPassword: string | number;
  fullName: string;
  email: string;
  dateOfBirth: string;
  avatarImageUrl: string;
  //checkAgree: boolean;
}

export interface IGenderType {
  name: string;
  value: string;
}

export interface ILoginType {
  username: string;
  password: string;
  //checkAgree: boolean;
}

export interface ILoginResponse {
  userId: number;
  userRole: string;
}
