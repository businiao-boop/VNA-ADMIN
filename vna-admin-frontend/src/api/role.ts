import axios from "@/utils/request";
import type { RoleDto, RoleInfoDto, RoleListDto } from "@/types/modules/role.type";
export function saveRole(data: RoleDto) {
  return axios<RoleInfoDto>({
    url: "/role/save",
    data,
  });
}
export function infoRole(id: number) {
  return axios<RoleInfoDto>({
    url: "/role/info",
    data: { id },
  });
}
export function listRole() {
  return axios<RoleListDto[]>({
    url: "/role/list"
  })
}