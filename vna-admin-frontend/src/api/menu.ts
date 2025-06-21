import axios from "@/utils/request";
import { MenuDto, MenuInfoDto } from "@/types/modules/menu.type";
export function saveMenu(data: MenuDto) {
  return axios<MenuDto>({
    url: "/menu/save",
    data,
  });
}
export function listMenu() {
  return axios<MenuInfoDto[]>({
    url: "/menu/list",
  });
}
export function listRelationRequestPermission() {
  return axios<MenuInfoDto[]>({
    url: "/menu/listRelationRequestPermission",
  });
}
export function infoMenu(id: number, routerName?: string) {
  console.log(id, "id");

  return axios<MenuInfoDto>({
    url: "/menu/info",
    data: { id, routerName },
  });
}