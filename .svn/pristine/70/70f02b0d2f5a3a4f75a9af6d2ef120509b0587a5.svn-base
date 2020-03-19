/**
 * 树形数组转一维数组
 * @param Array _array_tree
 * @param Number id
 * @param Number pid
 * @param Array son
 */
export function arr2table(_array_tree, son = 'children', leaf = false, level = 0) {
  let tree = []
  for (const i in _array_tree) {
    const _tree = {}
    let sub = []
    for (const key in _array_tree[i]) {
      if (key === son) {
        sub = _array_tree[i][son]
      } else {
        _tree[key] = _array_tree[i][key]
      }
    }
    _tree['level'] = level
    if (leaf && (!sub || !sub.length)) {
      tree.push(_tree)
    } else if (!leaf) {
      tree.push(_tree)
    }
    if (sub) {
      const sub_array = arr2table(sub, son, leaf, level + 1)
      tree = tree.concat(sub_array)
    }
  }
  return tree
}

export function menusFormatter(menus = []) {
  const data = []
  if (menus instanceof Array) {
    for (const i in menus) {
      const menu = menus[i]
      const _menu = {}
      let children = []
      for (const f in menu) {
        if (!['menuTreeNodes', 'funcs'].includes(f)) {
          if (f === 'funcUrl') {
            _menu['url'] = menu[f]
          } else {
            _menu[f] = menu[f]
          }
        } else {
          children = menu[f]
        }
      }
      if (children && children.length) {
        _menu['children'] = menusFormatter(children)
      }
      data.push(_menu)
    }
  }
  return data
}

export function pathFormatter(path, url) {
  const str = '\/sgm|\/setva|\/setvb|\/setvc|\/setvd|\/setve|\/setvf|\/setvg|\/setvh|\/detail|\/list|\/\\d+'
  return path.replace(new RegExp('(' + str + ')', 'g'), '')
}

export function submitForm(method, url, params, target) {
  var tempform = document.createElement('form')
  tempform.action = url
  tempform.method = method
  tempform.style.display = 'none'
  if (target) {
    tempform.target = target
  }

  for (var x in params) {
    const value = encodeURIComponent(params[x])
    if (value === '' || value === undefined) continue
    const opt = document.createElement('input')
    opt.name = x
    opt.value = params[x]
    tempform.appendChild(opt)
  }

  const opt2 = document.createElement('input')
  opt2.type = 'submit'
  tempform.appendChild(opt2)
  document.body.appendChild(tempform)
  tempform.submit()
  document.body.removeChild(tempform)
}
export function array_diff(arr1 = [], arr2 = []) {
  var m = {}
  arr1.forEach(function(al) { m[al] = al })
  arr2.forEach(function(bl) { delete m[bl] })
  return Object.values(m)
}
// 字符串长度
export function strlen(str) {
  if (str == null) return 0
  if (typeof str !== 'string') {
    str += ''
  }
  return str.replace(/[^\x00-\xff]/g, '01').length
}
export function strWidth(str, fontSize = 14) {
  let width = 0
  switch (fontSize) {
    case 12: width = strlen(str) * 6.8; break
    case 14: width = strlen(str) * 8; break
    case 16: width = strlen(str) * 10; break
  }
  return Math.ceil(width) + 16
}
/**
 * 展开数组
 */
export function expandArray(source, level) {
  var sourceCopy = []
  for (var item in source) {
    if (level > 0 && parseInt(item) !== level) continue
    sourceCopy = [...sourceCopy, ...source[item] || []].filter(item => { return ![null].includes(item) })
  }
  return sourceCopy
}
/**
 * 获取树的深度
 * @param {Object} jsonData
 */
export function getTreeDeep(jsonData) {
  let num = 0
  function recursion(data, k) {
    num = Math.max(num, k)
    for (const x in data) {
      const obj = data[x]
      if (obj.children) {
        recursion(obj.children, k + 1)
      }
    }
  }
  recursion(jsonData, 1)
  return num
}
/**
 * 参数对象拼装为uri
 * @param {Object} params URL参数
 */
export function queryEncoded(params) {
  var queryStr = ''
  for (const key in params) {
    const value = encodeURIComponent(params[key])
    if (value === '' || value === undefined) continue
    queryStr += '&' + key + '=' + value
  }
  return queryStr.substr(1)
}
/**
 * 深度复制对象数组
 * @param {Object,Array} source 对象数组
 */
export function copyObject(source) {
  var sourceCopy = source instanceof Array ? [] : {}
  for (var item in source) {
    sourceCopy[item] = typeof source[item] === 'object' && source[item] !== null ? copyObject(source[item]) : source[item]
  }
  return sourceCopy
}
/**
 * 路由最后添加子车型
 * @param {String} route 路由
 * @param {String} subModelId 子车型
 */
export function addPath(route, subModelId) {
  const path = route.path
  const paths = path.split('/')
  if (isNaN(paths[paths.length - 1])) {
    paths.push(subModelId)
  } else {
    paths[paths.length - 1] = subModelId
  }
  return paths.join('/')
}
