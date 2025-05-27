// 权限掩码（4 位二进制，对应 CRUD）
export enum PermissionBit {
  INFO = 0b0000000000000001, // 查看
  UPDATE = 0b0000000000000010, // 修改
  DELETE = 0b0000000000000100, // 删除
  CREATE = 0b0000000000001000, // 新增
}
