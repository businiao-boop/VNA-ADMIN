import { Body, Controller, Post } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { SavePermissionDto } from "./dto/save-permission.dto";

@Controller("permission")
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post("save")
  save(@Body() createPermissionDto: SavePermissionDto) {
    return this.permissionService.save(createPermissionDto);
  }
}
