import axios from "@/utils/request";

// 登录


import { UserResponseDto, LoginResponseDto, LoginDto } from "@/types/api/auth";
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
