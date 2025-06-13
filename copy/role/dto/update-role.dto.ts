import { PartialType } from "@nestjs/mapped-types";
import { SaveRoleDto } from "./save-role.dto";

export class UpdateRoleDto extends PartialType(SaveRoleDto) {
  id: number;
}
