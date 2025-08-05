/**
 * 将扁平化的数据转换为树形结构
 * @param {Array} list - 扁平化的数据数组
 * @param {Object} options - 配置选项
 * @param {string} options.rowField - 主键字段名，默认为 'id'
 * @param {string} options.parentField - 父级字段名，默认为 'parentId'
 * @param {string} options.childrenField - 子节点字段名，默认为 'children'
 * @returns {Array} 树形结构的数据
 */
const buildTree = (list, options = {
  rowField: "id",
  parentField: "parentId",
  childrenField: "children"
}) => {
  if (Array.isArray(list) && list.length > 0) {
    const { rowField, parentField, childrenField } = options;
    const treeMap = list.reduce((acc, cur) => {
      acc[cur[rowField]] = { ...cur, [childrenField]: [] }
      return acc
    }, {})
    const tree = [];
    list.forEach(item => {
      const current = treeMap[item[rowField]];
      if (item[parentField] === 0 || item[parentField] === null || item[parentField] === undefined || !treeMap[item[parentField]]) {
        tree.push(current)
      } else {
        treeMap[item[parentField]][childrenField].push(current)
      }
    })
    return tree;
  } else {
    return list
  }
}

/**
 * 将树形结构的数据扁平化
 * @param {Array} tree - 树形结构的数据
 * @param {Object} options - 配置选项
 * @param {string} options.childrenField - 子节点字段名，默认为 'children'
 * @returns {Array} 扁平化的数据
 */
const flattenTree = (tree, options = {}) => {
  const { childrenField = 'children' } = options;
  const result = [];

  function flatten(nodes, level = 0) {
    nodes.forEach(node => {
      const { [childrenField]: children, ...item } = node;
      result.push({ ...item, level });
      
      if (children && children.length > 0) {
        flatten(children, level + 1);
      }
    });
  }

  flatten(tree);
  return result;
}

/**
 * 查找树中的所有父节点
 * @param {Array} tree - 树形结构的数据
 * @param {string|number} targetId - 目标节点ID
 * @param {Object} options - 配置选项
 * @param {string} options.idKey - 主键字段名，默认为 'id'
 * @param {string} options.childrenField - 子节点字段名，默认为 'children'
 * @returns {Array} 父节点路径
 */
const findParentPath = (tree, targetId, options = {}) => {
  const { idKey = 'id', childrenField = 'children' } = options;
  const path = [];

  function findPath(nodes, currentPath = []) {
    for (const node of nodes) {
      const newPath = [...currentPath, node];
      
      if (node[idKey] === targetId) {
        path.push(...newPath);
        return true;
      }

      if (node[childrenField] && node[childrenField].length > 0) {
        if (findPath(node[childrenField], newPath)) {
          return true;
        }
      }
    }
    return false;
  }

  findPath(tree);
  return path;
}

/**
 * 查找树中的节点
 * @param {Array} tree - 树形结构的数据
 * @param {Function} predicate - 查找条件函数
 * @param {Object} options - 配置选项
 * @param {string} options.childrenField - 子节点字段名，默认为 'children'
 * @returns {Object|null} 找到的节点
 */
const findNode = (tree, predicate, options = {}) => {
  const { childrenField = 'children' } = options;

  function search(nodes) {
    for (const node of nodes) {
      if (predicate(node)) {
        return node;
      }

      if (node[childrenField] && node[childrenField].length > 0) {
        const found = search(node[childrenField]);
        if (found) return found;
      }
    }
    return null;
  }

  return search(tree);
}

export {
  buildTree,
  flattenTree,
  findParentPath,
  findNode
}