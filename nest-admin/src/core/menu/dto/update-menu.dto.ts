import { PartialType } from "@nestjs/mapped-types";
import { SaveMenuDto } from "./save-menu.dto";

export class UpdateMenuDto extends PartialType(SaveMenuDto) {}
