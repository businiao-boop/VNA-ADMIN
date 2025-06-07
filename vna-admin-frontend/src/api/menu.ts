import axios from "@/utils/request";
import type { MenuType, MenuResponseDto } from "@/types/modules/menu.type";

export function saveMenu(data: MenuType) {
  return axios<MenuResponseDto>({
    url: "/menu/save",
    data,
  });
}