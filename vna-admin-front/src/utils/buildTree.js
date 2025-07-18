const buildTree = (list, options = {
  rowKey: "id",
  parentKey: "parentId",
  childrenKey: "children"
}) => {
  if (Array.isArray(list) && list.length > 0) {
    const { rowKey, parentKey, childrenKey } = options;
    const treeMap = list.reduce((acc, cur) => {
      acc[cur[rowKey]] = { ...cur, [childrenKey]: [] }
      return acc
    }, {})
    const tree = [];
    list.forEach(item => {
      const current = treeMap[item[rowKey]];
      if (item[parentKey] === 0) {
        tree.push(current)
      } else {
        treeMap[item[parentKey]][childrenKey].push(current)
      }
    })
    return tree;
  } else {
    return list
  }
}

export {
  buildTree
}