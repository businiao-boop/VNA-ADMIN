import { Body, Controller, Post } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { CreateMenuDto } from "./dto/create-menu.dto";

@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post("list")
  async list() {
    return this.menuService.find();
  }

  @Post("save")
  async save(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.save(createMenuDto);
  }

  @Post("remove")
  remove(@Body("id") id: number) {
    return this.menuService.remove(id);
  }
}
