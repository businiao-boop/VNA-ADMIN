import { Body, Controller, Post } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { SaveMenuDto } from "./dto/save-menu.dto";

@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post("list")
  async list() {
    return this.menuService.find();
  }

  @Post("save")
  async save(@Body() createMenuDto: SaveMenuDto) {
    return this.menuService.save(createMenuDto);
  }

  @Post("remove")
  remove(@Body("id") id: number) {
    return this.menuService.remove(id);
  }
}
