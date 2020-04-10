
import { color } from '@/utils/includes'
import { copyObject } from '@/utils/helper'
import { toThousand, toPercent } from '@/utils/filters'

const defaultOptions = {
  backgroundColor: '#fff',
  color: color.line,
  tooltip: {
    trigger: 'axis',
    color: '#ADB0BA',
    backgroundColor: '#4E545E',
    textStyle: {
      color: '#B2B4BF',
      fontSize: 12
    }
  },
  legend: {
    orient: 'horizontal',
    top: 0,
    bottom: 20,
    left: 0,
    right: 0
  },
  grid: {
    borderWidth: 0,
    left: 80,
    right: 20,
    top: 60,
    bottom: 80
  }
}
const defaultConfig = {
  tooltipFields: []
}
const seriesOptions = {
  smooth: false
}

function titleUpperCase(str) {
  if (str) return str[0].toUpperCase() + str.substr(1)
  else return str
}
/**
 * 提示信息格式化
 * 针对散点图，地图等多个系列
 * 特殊处理可在本类外重写该方法
 * @params Object 返回参数
 * @params config 自定义参数
 */
function tooltipFormatter(params, config) {
  let html = ''
  let title = ''
  // 把数据倒序，达到最终展示的tooltips和柱子层级顺序一样
  if (config.tooltipSort === '-1' && params.length) params = params.reverse()
  params.map((item, key) => {
    if (!title) title = item.name + '<br>'
    let val = ''
    if (item.value === undefined || isNaN(item.value)) val = '-'
    else {
      if (config.tooltipZerofilter && Number(item.value) === 0) return
      const field = config.tooltipFields.find(ele => { return item.seriesName.indexOf(ele.name) > -1 }) || config.defaultField || {}
      val = `<em style="color:${config.tooltipHightLightColor};">`
      switch (field.type) {
        case 'normal': val += toThousand(item.value) + `</em>` + field.unit; break
        case 'percent': val += toPercent(item.value, 1) + `</em>`; break
        case 'decimal': val += Number(item.value).toFixed(1) + `</em>` + field.unit; break
        default: val += toThousand(item.value) + `</em>`; break
      }
    }
    html = html + `${item.marker}${item.seriesName}：${val}` + '<br>'
  })
  return title + html
}
function labelFormatter(param, config) {
  let val = param.value
  var value = param.value
  const field = config.tooltipFields.find(field => { return param.seriesName.indexOf(field.name) > -1 }) || config.defaultField || {}
  switch (field.type) {
    case 'normal': val = toThousand(value); break
    case 'percent': val = toPercent(value, 1); break
    case 'decimal': val = Number(value).toFixed(1); break
    default: val = toThousand(value); break
  }
  return val
}
function iconFormatter(serie, config) {
  let val = ''
  if (serie === undefined || serie === null) { // 如果series和legend不是一一对应的时候需要判断空值
    return val
  }
  switch (serie.type) {
    case 'pie':
    case 'bar': val = config.legendIcon.bar; break
    case 'line': val = config.legendIcon.line; break
    default: val = ''; break
  }
  return val
}

export class Chart {
  constructor(type, option, config = {}) {
    this.type = type
    this.config = { ...defaultConfig }
    this.option = { ...defaultOptions, ...copyObject(option) }
    for (const key in config) {
      if (defaultOptions[key]) {
        this.option[key] = config[key]
      } else {
        this.config[key] = config[key]
      }
    }
    this.seriesOptions = { ...seriesOptions }
    return this
  }
  getChart() {
    return this[`get${titleUpperCase(this.type)}Chart`]()
  }
  getLineChart() {
    const option = {
      ...this.option,
      legend: this.legend(this.option.legend, this.config),
      tooltip: this.tooltip(this.option.tooltip, this.config),
      series: this.series(this.option.series, this.config)
    }
    return option
  }
  tooltip(tooltip, config) {
    return Object.assign({}, tooltip, {
      formatter: (params) => tooltipFormatter(params, config)
    })
  }
  legend(legend, config) {
    return Object.assign({}, legend, {
      bottom: 10,
      type: 'scroll',
      textStyle: {
        color: '#5a5a5a'
      },
      data: legend && legend.data.map((item, key) => {
        return {
          name: item,
          icon: iconFormatter(this.option.series[key], config)
        }
      })
    })
  }
  series(series, config) {
    if (!series || series.length <= 0) {
      return []
    }
    return this.option.series.map((item, key) => {
      const color = this.option.color
      return {
        type: 'line',
        name: item.name,
        markPoint: item.markPoint,
        yAxisIndex: item.yAxisIndex || 0,
        symbolSize: 10,
        smooth: !!this.seriesOptions.smooth,
        itemStyle: {
          normal: {
            color: color.length ? color[key] : color.line[key % 6],
            label: {
              show: true,
              position: 'top',
              formatter: param => labelFormatter(param, config)
            }
          }
        },
        data: item.data
      }
    })
  }
}

