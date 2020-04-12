import { color } from '@/utils/includes'
import { copyObject, mergeObject } from '@/utils/helper'
import { toThousand, toPercent } from '@/utils/filters'
/**
 * option的默认值
 * 可通过配置构造函数的config参数重置
 */
const defaultOptions = {
  backgroundColor: '#fff',
  color: color.line,
  tooltip: {
    trigger: 'axis',
    color: '#ADB0BA',
    backgroundColor: '#4E545E',
    hightLightColor: '#CD8E46',
    textStyle: {
      color: '#B2B4BF',
      fontSize: 12
    }
  },
  legend: {
    orient: 'horizontal',
    bottom: 10,
    type: 'scroll',
    textStyle: {
      color: '#5a5a5a'
    }
  },
  grid: {
    left: 80,
    right: 20,
    top: 60,
    bottom: 80
  },
  xAxis: {
    name: '',
    nameTextStyle: {
      color: '#7f8593'
    },
    axisLine: {
      lineStyle: {
        color: '#dfdfdf'
      }
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitArea: {
      show: false
    },
    axisLabel: {
      fontSize: 12,
      color: '#7f8593'
    }
  },
  yAxis: {
    name: '',
    nameTextStyle: {
      color: '#7f8593'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#ececec',
        type: 'dashed'
      }
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#dfdfdf'
      }
    },
    axisTick: {
      show: false
    },
    splitArea: {
      show: false
    },
    axisLabel: {
      fontSize: 12,
      color: '#7f8593'
    }
  },
  dataZoom: {
    show: true,
    orient: 'horizontal',
    start: undefined,
    end: 100,
    height: 14,
    bottom: 40,
    showDetail: false,
    showDataShadow: false,
    handleIcon:
      'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z',
    handleSize: '50%',
    handleStyle: {
      color: '#82cbc5'
    },
    textStyle: {
      color: '#fff'
    },
    backgroundColor: '#f7f7f7',
    borderColor: '#f7f7f7'
  }
}
/**
 * series的默认值
 * 可通过配置构造函数的config参数重置
 */
const defaultSeriesOptions = {
  line: {
    smooth: false,
    symbolSize: 10,
    itemStyle: {
      normal: {
        label: {
          show: true,
          position: 'top'
        }
      }
    }
  },
  bar: {
    barMaxWidth: 40,
    barMinHeight: 5,
    itemStyle: {
      normal: {
        barBorderRadius: 0
      }
    }
  },
  pie: {
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    label: {
      show: false,
      position: 'center'
    },
    itemStyle: {
      normal: {
        labelLine: {
          show: true
        }
      }
    },
    emphasis: {
      label: {
        show: true,
        fontSize: '30',
        fontWeight: 'bold'
      }
    }
  },
  scatter: {
    label: {
      normal: {
        color: '#000',
        show: true,
        formatter: params => {
          return params.value[4]
        }
      }
    },
    symbolSize: (value, params) => {
      return value[2] * 30 / value[3]
    }
  }
}
/**
 * 其他用于计算或展示的默认值
 */
const defaultConfig = {
  numPerPage: 12,
  tooltipSort: '1', // 1正序 ； -1倒叙
  legendIcon: {
    bar: 'path://M512 512m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z',
    line: 'path://M16.5,4.2C16.1,1.8,14,0,11.6,0S7,1.8,6.7,4.2H3.2v2h3.5C7.3,8.4,9.2,10,11.6,10s4.3-1.6,4.8-3.8h3.8v-2H16.5z    M11.6,8c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S13.2,8,11.6,8z'
  },
  tooltipFields: [
  ],
  defaultField: undefined
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
function tooltipFormatter(params, config, tooltip) {
  let html = ''
  let title = ''
  // 把数据倒序，达到最终展示的tooltips和柱子层级顺序一样
  if (config.tooltipSort === '-1' && params.length) params = params.reverse()
  params.map((item, key) => {
    if (!title) title = item.name + '<br>'
    let val = ''
    if (item.value === undefined || isNaN(item.value)) val = '-'
    else {
      // if (config.tooltipZerofilter && Number(item.value) === 0) return
      const field = config.tooltipFields.find(ele => { return item.seriesName.indexOf(ele.name) > -1 }) || config.defaultField || {}
      val = `<em style="color:${tooltip.hightLightColor};">`
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

/**
 * 提示信息格式化
 * 针对散点图，地图等单个系列
 * @params Object 返回参数
 * @params config 自定义参数
 * tooltipFields: [
      { title: '车型', type: '', key: 4 },
      { name: '利润', type: 'percent', key: 0 },
      { name: '同比', type: 'percent', key: 1 },
      { name: '销量', type: 'normal', key: 2, unit: '' }
    ]
 */
function tooltipFormatterItem(params, config, tooltip) {
  let html = ''
  let title = ''
  var value = params.value
  if (params.seriesType === 'scatter') {
    const fields = config.tooltipFields
    fields.length && fields.forEach(item => {
      if (item.title && !title) title = `${params.marker}${value[item.key]}<br>`
      if (item.name) {
        let val = ''
        const field = item
        val = `<em style="color:${tooltip.hightLightColor};">`
        switch (field.type) {
          case 'normal': val += toThousand(value[item.key]) + `</em>` + field.unit; break
          case 'percent': val += toPercent(value[item.key], 1) + `</em>`; break
          case 'decimal': val += Number(value[item.key]).toFixed(1) + `</em>` + field.unit; break
          default: val += toPercent(value[item.key], 1) + `</em>`; break
        }
        html = html + `${item.name}：${val}` + '<br>'
      }
    })
  } else if (params.seriesType === 'pie') {
    title = params.seriesName + '<br>'
    let val = `<em style="color:${tooltip.hightLightColor};">`
    val += `${toThousand(params.value)} (${toPercent(params.percent, 1)})</em>`
    html = `${params.marker}${params.name}：${val}`
  }
  return title + html
}
function labelFormatter(param, config) {
  let val = param.value
  var value = param.value
  const field = config.tooltipFields.find(field => { return param.seriesName.indexOf(field.name) > -1 }) || config.defaultField || {}
  if (Object.keys(field).length) {
    switch (field.type) {
      case 'normal': val = toThousand(value); break
      case 'percent': val = toPercent(value, 1); break
      case 'decimal': val = Number(value).toFixed(1); break
      default: val = toThousand(value); break
    }
  } else if (param.seriesType === 'pie') {
    val = `${param.name}${toThousand(param.value)} (${toPercent(param.percent, 1)})`
  }
  return val
}
function iconFormatter(type, config) {
  let val = ''
  switch (type) {
    case 'pie':
    case 'bar': val = config.legendIcon.bar; break
    default: val = ''; break
  }
  return val
}

export class Chart {
  constructor(type, option, config = {}) {
    this.type = type
    // config默认值
    this.config = { ...defaultConfig }
    // option初始值
    this.option = copyObject(option)
    // 合并参数config和option初始值
    for (const key in config) {
      if (defaultOptions[key]) {
        this.option[key] = mergeObject(this.option[key], config[key])
      } else {
        this.config[key] = config[key]
      }
    }
    // 合并option默认值和初始值
    this.option = mergeObject(defaultOptions, this.option)
    // 特殊处理各种类型
    const method = `set${titleUpperCase(this.type)}Option`
    method in this && this[method](defaultOption => {
      const config = this.config
      this.option = mergeObject(this.option, defaultOption)
      for (const key in config) {
        if (defaultOption[key]) {
          this.option[key] = mergeObject(this.option[key], config[key])
        }
      }
    })
    return this
  }
  setPieOption(fn = () => {}) {
    const defaultOptions = {
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        axisLine: {
          show: false
        }
      }
    }
    fn(defaultOptions)
  }
  setScatterOption(fn = () => {}) {
    const maxValue = this.option.maxValue
    const defaultOptions = {
      tooltip: {
        trigger: 'item'
      },
      grid: {
        top: 120,
        left: 60,
        right: 60,
        bottom: 70
      },
      xAxis: {
        axisLabel: {
          showMinLabel: false,
          showMaxLabel: false
        },
        max: params => {
          const absMaxValue = Math.max(Math.abs(params.min), Math.abs(params.max)) || 1
          return params.max !== -Infinity ? absMaxValue * 1.5 : 1
        },
        min: params => {
          const absMaxValue = Math.max(Math.abs(params.min), Math.abs(params.max)) || 1
          return params.min !== Infinity ? absMaxValue * 1.5 * -1 : -1
        }
      },
      yAxis: {
        axisLine: {
          show: true
        },
        axisLabel: {
          showMinLabel: false,
          showMaxLabel: false
        },
        max: params => {
          const absMaxValue = Math.max(Math.abs(params.min), Math.abs(params.max)) || 1
          return params.max !== -Infinity ? absMaxValue * 1.5 : 1
        },
        min: params => {
          const absMaxValue = Math.max(Math.abs(params.min), Math.abs(params.max)) || 1
          return params.min !== Infinity ? absMaxValue * 1.5 * -1 : -1
        }
      },
      visualMap: {
        min: 0,
        max: maxValue,
        orient: 'horizontal',
        right: '20',
        top: '20',
        dimension: 2,
        itemWidth: 20,
        itemHeight: 200,
        calculable: true,
        precision: 0.1,
        text: ['大', '小'],
        textGap: 30,
        backgroundColor: '#fbfbfb',
        padding: [15, 20, 15, 20],
        borderWidth: 1,
        borderColor: '#ddd',
        inRange: {
          symbolSize: [40, 80]
        },
        outOfRange: {
          symbolSize: [10, 70],
          color: ['transparent']
        },
        target: {
          outOfRange: {
            color: ['transparent'],
            symbolSize: [0, 0]
          }
        },
        controller: {
          inRange: {
            color: ['#CBDDFC', '#3972D5']
          },
          outOfRange: {
            color: ['#eee']
          }
        }
      }
    }
    fn(defaultOptions)
  }

  tooltip(tooltip = {}, config, type) {
    if (tooltip.trigger === 'item') {
      tooltip.formatter = params => tooltipFormatterItem(params, config, tooltip)
    } else {
      tooltip.formatter = params => tooltipFormatter(params, config, tooltip)
    }
    return tooltip
  }
  legend(legend = {}, config) {
    if (!legend.data || legend.data.length <= 0) {
      legend.data = this.option.series.map(item => {
        return item.name
      })
    }
    return Object.assign({}, legend, {
      data: legend && legend.data && legend.data.map((item, key) => {
        const serie = legend.data.length === this.option.series.length ? this.option.series[key] : this.option.series[0]
        return {
          name: item,
          icon: serie ? iconFormatter(serie.type, config) : ''
        }
      })
    })
  }
  xAxis(xAxis, config) {
    return xAxis
  }
  yAxis(yAxis, config) {
    return yAxis
  }
  dataZoom(dataZoom = {}, config) {
    const option = this.option
    option.xAxis = Array.isArray(option.xAxis) ? option.xAxis : [option.xAxis]
    option.yAxis = Array.isArray(option.yAxis) ? option.yAxis : [option.yAxis]
    let start = 0
    if (option.xAxis[0].data) {
      const len = option.xAxis[0].data.length
      start = len <= config.numPerPage ? 0 : parseInt(((len - config.numPerPage + 1) / len) * 100)
    }
    if (option.yAxis[0].data && option.yAxis[0].type === 'category') {
      const len = option.yAxis[0].data.length
      start = len <= config.numPerPage ? 0 : parseInt(((len - config.numPerPage + 1) / len) * 100)
    }
    start = Number(start)
    if (dataZoom.start !== undefined) {
      dataZoom.end = Math.min(100 - start + Number(dataZoom.start), 100)
    } else {
      dataZoom.start = Math.min(start, 100)
      dataZoom.end = 100
    }
    if (dataZoom.start === 0 && dataZoom.end === 100) {
      dataZoom.show = false
    }
    return [dataZoom]
  }
  series(series = [], config) {
    if (!series || series.length <= 0) {
      return []
    }
    return this.option.series.map((item, key) => {
      // const color = this.option.color
      const defaultOptions = defaultSeriesOptions[item.type]
      // 合并defaultOptions的属性
      item.itemStyle = {
        normal: {
          label: {
            formatter: param => labelFormatter(param, config)
          }
        }
      }
      item = mergeObject(defaultOptions, item)
      // 合并config的属性
      if (defaultOptions) {
        for (const key in config) {
          if (key in defaultOptions) {
            item[key] = mergeObject(item[key], config[key])
          }
        }
      }
      return item
    })
  }

  getChart() {
    this.option = {
      ...this.option,
      legend: this.legend(this.option.legend, this.config),
      tooltip: this.tooltip(this.option.tooltip, this.config, this.type),
      xAxis: this.xAxis(this.option.xAxis, this.config),
      yAxis: this.yAxis(this.option.yAxis, this.config),
      series: this.series(this.option.series, this.config),
      dataZoom: this.dataZoom(this.option.dataZoom, this.config)
    }
    return this.option
  }
  // 兼容旧版，不能删除
  getLineChart() {
    return this.option
  }
  getBarChart() {
    return this.option
  }
  getPieChart() {
    return this.option
  }
  getScatterChart() {
    return this.option
  }
}

