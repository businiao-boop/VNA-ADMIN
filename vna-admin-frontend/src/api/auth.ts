import axios from "@/utils/request";

// 登录


import { UserResponseDto, LoginResponseDto, LoginDto } from "@/types/modules/auth.type";
export function login(data: LoginDto) {
  return axios<LoginResponseDto>({
    url: "/auth/login",
    data,
  });
}
export function register(data: LoginDto) {
  return axios<LoginResponseDto>({
    url: "/auth/register",
    data,
  });
}
export function getUserProfile() {
  return axios<UserResponseDto>({
    url: "/auth/user",
  });
}
