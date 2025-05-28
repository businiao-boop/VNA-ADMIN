import { BackendRoute } from "../router";
export type UserResponseDto = {
  id: number;
  username: string;
  password: string;
  gender: string;
  nickname: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  routes: BackendRoute[];
};

export type LoginDto = {
  username: string;
  password: string;
  rememberMe?: boolean;
};

export type LoginResponseDto = {
  access_token: string;
};
