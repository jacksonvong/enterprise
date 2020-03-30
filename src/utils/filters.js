import moment from 'moment'

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  console.log(num)
  return num.toString()
}

export function trim(str, target = '') {
  if (target !== '') {
    return str.replace(/(^\/*)|(\/*$)/g, '')
  } else {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }
}

export function toThousand(num, decimal = 0, preffix = '') {
  if (num === undefined || num === null || num === 'null' || num === '-' || num === '') return '-'
  return preffix + Number(+num || 0).toFixed(decimal).replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function toPercent(num, decimal = 0, preffix = false, suffix = '%', multiple = 100) {
  if (num === undefined || num === null || num === 'null' || num === '-' || num === '') return '-'
  if (typeof num === 'string' && num.indexOf('%') > -1) num = num.replace('%', '')
  var str = Number(num * multiple).toFixed(decimal)
  if (preffix) {
    const preffixChar = Number(str) === 0 ? '' : (Number(str) >= 0 ? '+' : '-')
    str = preffixChar + str.replace(preffixChar, '')
  }
  return str + suffix
}

export function isPlusOrMinus(num) {
  if (isNaN(num) && typeof num === 'string') {
    num = num.replace(/[\+|%]/g, '')
  }
  if (num === null || num === undefined || num === '-') return null
  else return Number(num) >= 0 ? '1' : '-1'
}

export function monthFilter(val) {
  const monthObj = {
    Jan: '1月', Feb: '2月', Mar: '3月', Apr: '4月', May: '5月', Jun: '6月', Jul: '7月',
    Aug: '8月', Sep: '9月', Oct: '10月', Nov: '11月', Dec: '12月'
  }
  return monthObj[val]
}

export function toDate(num, pattern = 'YYYY-MM-DD') {
  return moment(num).format(pattern)
}
