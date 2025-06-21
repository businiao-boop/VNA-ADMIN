import axios from "@/utils/request";
import { UserDto, UserInfoDto } from "@/types/modules/user.type";

export function saveUser(data: UserDto) {
  return axios({
    url: "/user/save",
    data,
  });
}

export function listUser() {
  return axios<UserInfoDto[]>({
    url: "/user/list",
  });
}
export function deleteUser(id: number) {
  return axios<UserDto>({
    url: "/user/delete",
    data: { id },
  });
}
export function infoUser(id: number) {
  return axios<UserDto>({
    url: "/user/info",
    data: { id },
  });
}
export function getUserProfile() {
  return axios<UserInfoDto>({
    url: "/user/getUserProfile",
    // data: { id },
  });
}