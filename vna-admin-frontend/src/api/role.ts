import axios from "@/utils/request";
import type { RoleType } from "@/types/modules/role.type";

export function saveRole(data: RoleType) {
  return axios({
    url: "/role/save",
    data,
  });
}
export function listRole() {
  return axios<RoleType[]>({
    url: "/role/list"
  })
}