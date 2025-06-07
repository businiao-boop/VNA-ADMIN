import axios from "@/utils/request";
import type { MenuType, MenuResponseDto } from "@/types/modules/menu.type";

export function saveMenu(data: MenuType) {
  return axios<MenuResponseDto>({
    url: "/menu/save",
    data,
  });
}
export function listMenu() {
  return axios<MenuType[]>({
    url: "/menu/list",
  });
}