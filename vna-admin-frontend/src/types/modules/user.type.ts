import { RoleInfoDto } from './role.type';
type UserType = {
  id?: number | null;
  username: string;
  password?: string;
  roleIds: RoleInfoDto['id'][];
  nickname?: string;
}

export type UserInfoDto = UserType & { id: number };

export type UserDto = UserType