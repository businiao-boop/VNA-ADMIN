
const defaultOption = {
  rowKey: 'id',
  parentKey: 'parentId',
  childrenKey: 'children'
}

type OptionsType = typeof defaultOption;
export function buildTree(trees: Object[], options: OptionsType = defaultOption): any[] {

  const { rowKey, parentKey, childrenKey } = options;

  const treeMap = new Map<string | number, any>();
  const tree: any[] = [];
  trees.forEach((t) => {
    const x = {
      ...t,
      [childrenKey]: []
    };
    treeMap.set(t[rowKey], x);
  });

  trees.forEach((t) => {
    const current = treeMap.get(t[rowKey]);
    if (t[parentKey] && treeMap.has(t[parentKey])) {
      treeMap.get(t[parentKey])[childrenKey].push(current);
    } else {
      tree.push(current);
    }
  });


  return tree;
}