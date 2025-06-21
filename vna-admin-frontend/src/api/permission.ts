import { PermissionDto } from "@/types/modules/permission.type";
import axios from "@/utils/request";

export function listPermission() {
  return axios<PermissionDto[]>({
    url: "/permission/list",
  });
}

export function savePermission(dto: PermissionDto) {
  return axios<PermissionDto>({
    url: "/permission/save",
    method: "POST",
    data: dto,
  });
}