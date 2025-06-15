export type TreeDto = {
  title?: string;
  key?: string;
  id?: number;
  label?: string;
  parentId?: number;
  children?: TreeDto[];
  [key: string]: any;
}