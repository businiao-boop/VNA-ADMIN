export type RoleType = {
  id?: number;
  code: string;
  name: string;
  description?: string;
  // remark?: string;
  // status?: boolean;
  menuIds?: number[];
  // 键：menuId，值：permissionIds
  permissions?: Record<string, string[]>;
}