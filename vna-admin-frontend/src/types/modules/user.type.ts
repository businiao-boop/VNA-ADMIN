export type UserType = {
  id?: number | null;
  username: string;
  password?: string;
  roleIds: number[];
  nickname?: string;
}