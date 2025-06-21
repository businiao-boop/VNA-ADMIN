export type TreeDto = {
  title?: string;
  key?: string;
  id?: number;
  label?: string;
  parentId?: number;
  children?: TreeDto[];
  [key: string]: any;
}


export type TreeEventType = {
  node: any;
  checked: boolean;
  checkedNodes: any[];
  halfCheckedKeys: (string | number)[]
}