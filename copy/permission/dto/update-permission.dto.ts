// src/modules/permission/dto/update-permission.dto.ts
import { PartialType } from "@nestjs/mapped-types";
import { SavePermissionDto } from "./save-permission.dto";

export class UpdatePermissionDto extends PartialType(SavePermissionDto) {}
