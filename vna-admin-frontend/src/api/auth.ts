import axios from "@/utils/request";

export type LoginDto = {
  username: string;
  password: string;
  rememberMe?: boolean;
};

export type LoginResponseDto = {
  access_token: string;
};

export type UserResponseDto = {
  id: number;
  username: string;
  password: string;
  roles: string[]; // TODO: define role type
  gender: string;
  nickname: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
};
export function login(data: LoginDto) {
  return axios<LoginResponseDto>({
    url: "/auth/login",
    data,
  });
}
export function getUserProfile() {
  return axios<UserResponseDto>({
    url: "/auth/user",
  });
}