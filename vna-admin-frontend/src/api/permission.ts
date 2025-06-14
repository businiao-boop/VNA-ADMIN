import { PermissionType } from "@/types/modules/permission.type";
import axios from "@/utils/request";

export function listPer() {
  return axios<PermissionType[]>({
    url: "/permission/list",
  });
}