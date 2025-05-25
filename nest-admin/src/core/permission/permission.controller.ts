import { Body, Controller, Post } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { CreatePermissionDto } from "./dto/create-permission.dto";

@Controller("permission")
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post("save")
  save(@Body() createPermissionDto: CreatePermissionDto) {
    this.permissionService.save(createPermissionDto);
  }
}
