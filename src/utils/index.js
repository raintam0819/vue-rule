/**
 * 根据节点找出对应的父节点和节点下标
 * @param {Array} data 条件规则列表
 * @param {Object} condition 当前查询条件节点
 * @return {Object} { result, resIndex } 当前节点的父节点和下标
 */
export function getNode(data, condition) {
  let result, resIndex;

  function core(data, condition) {
    data.forEach((item, index) => {
      if (item === condition) {
        result = data;
        resIndex = index
      } else if (Array.isArray(item.subConditions) && item.subConditions.length > 0) {
        core(item.subConditions, condition);
      }
    });
  }

  core(data, condition);

  return { result, resIndex };
}

/**
 * 查找匹配的完整路径
 * @param {String} id 匹配的值
 * @param {Array} data 匹配的数组数据
 * @param {String} prop 匹配的字段名
 */
export function getFathersById (id, data, prop) {
  var arrRes = []
  const rev = (data, nodeId) => {
    for (var i = 0, length = data.length; i < length; i++) {
      const node = data[i]
      if (node[prop] == nodeId) {
        arrRes.unshift(node)
        return true
      } else {
        if (node.children?.length) {
          if (rev(node.children, nodeId)) {
            arrRes.unshift(node)
            return true
          }
        }
      }
    }
    return false
  }
  rev(data, id)
  return arrRes
}
