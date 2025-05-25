import axios from "@/utils/request";

export type LoginDto = {
  username: string;
  password: string;
  rememberMe?: boolean;
};

export type LoginResponseDto = {
  access_token: string;
};
export function login(data: LoginDto) {
  return axios<LoginResponseDto>({
    url: "/auth/login",
    data,
  });
}
