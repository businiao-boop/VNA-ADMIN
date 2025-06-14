import axios from "@/utils/request";
import { UserType } from "@/types/modules/user.type";

export function saveUser(data: UserType) {
  return axios({
    url: "/user/save",
    data,
  });
}

export function listUser() {
  return axios<UserType[]>({
    url: "/user/list",
  });
}
export function deleteUser(id: number) {
  return axios<UserType>({
    url: "/user/delete",
    data: { id },
  });
}