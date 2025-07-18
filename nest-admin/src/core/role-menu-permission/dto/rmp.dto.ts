import { IsNumber, IsOptional } from "class-validator";

export class SaveRmpDto {
  @IsNumber()
  menuId: number;
  @IsNumber()
  permissionId: number;
  @IsNumber()
  @IsOptional()
  roleId?: number;
}