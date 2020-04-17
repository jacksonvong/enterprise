import request from '@/utils/request'

//
export function getSingleModelTerminalAnalyzeData(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getSingleModelTerminalAnalyzeData',
    method: 'post',
    data: {
      data
    }
  })
}
export function getAllExcitationAnalyze(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getAllExcitationAnalyze',
    method: 'post',
    data: {
      data
    }
  })
}
export function getYearExcitationAnalyze(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getYearExcitationAnalyze',
    method: 'post',
    data: {
      data
    }
  })
}
export function getPattern(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getPattern',
    method: 'post',
    data: {
      data
    }
  })
}
export function getPie(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getPie',
    method: 'post',
    data: {
      data
    }
  })
}
export function getStatckBar(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getStatckBar',
    method: 'post',
    data: {
      data
    }
  })
}

// 总激励分析 - 【车型】及竞品总激励走势
export function getTotalStimulate(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getTotalStimulate',
    method: 'post',
    data: {
      data
    }
  })
}

// 总激励分析 - 【车型】及竞品销量分析
export function getTotalSaleTrend(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getTotalSaleTrend',
    method: 'post',
    data: {
      data
    }
  })
}

// 总激励分析 - 总激励结构对比
export function getTotalStimulateStructureComparison(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getTotalStimulateStructureComparison',
    method: 'post',
    data: {
      data
    }
  })
}

// 总激励分析 -  奖励项明细 - 奖励项对比
export function getTimeInfo(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getTimeInfo',
    method: 'post',
    data: {
      data
    }
  })
}

// 总激励分析 -  奖励项明细 - 奖励项分类明细
export function getTypeInfo(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getTypeInfo',
    method: 'post',
    data: {
      data
    }
  })
}

// 年度激励分析 -【车型】及竞品年度激励对比
export function getYearStimulateComparison(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getYearStimulateComparison',
    method: 'post',
    data: {
      data
    }
  })
}

// 年度激励分析 -【年】年度激励结构 VS 【年】年度激励结构 - bar 图
export function getYearStimulateStructureComparison(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getYearStimulateStructureComparison',
    method: 'post',
    data: {
      data
    }
  })
}

// 年度激励分析 -【年】年度激励结构 VS 【年】年度激励结构 - pie 图
export function getYearStimulateStructureComparisonPieList(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getYearStimulateStructureComparisonPieList',
    method: 'post',
    data: {
      data
    }
  })
}

// 月度激励分析 - 【车型】及竞品激励走势
export function getMonthSaleTrend(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getMonthSaleTrend',
    method: 'post',
    data: {
      data
    }
  })
}

// 月度激励分析 - 月度激励节奏情况
export function getMonthStimulateCondition(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getMonthStimulateCondition',
    method: 'post',
    data: {
      data
    }
  })
}

// 月度激励分析 -【年月】激励结构 VS 【年月】激励结构 - bar 图
export function getMonthStimulateStructureComparison(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getMonthStimulateStructureComparison',
    method: 'post',
    data: {
      data
    }
  })
}

// 月度激励分析 -【年月】激励结构 VS 【年月】激励结构 - pie 图
export function getMonthStimulateStructureComparisonPieList(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getMonthStimulateStructureComparisonPieList',
    method: 'post',
    data: {
      data
    }
  })
}

// 利润分析 -【车型】及竞品利润分析
export function getProfitAnalyze(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getProfitAnalyze',
    method: 'post',
    data: {
      data
    }
  })
}

// 利润分析 -【年月】利润结构对比
export function getProfitStructure(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getProfitStructure',
    method: 'post',
    data: {
      data
    }
  })
}

// 格局分析 -【车型】及竞品利润-销量分布
export function getProfitSaleDistribute(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getProfitSaleDistribute',
    method: 'post',
    data: {
      data
    }
  })
}

// 格局分析 - 竞争圈竞争格局分析图
export function getCompetitionSituation(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getCompetitionSituation',
    method: 'post',
    data: {
      data
    }
  })
}

// 单车价格策略分析 - 【车型】全车系价格策略表现 - 销量价格
export function getModelPriceTrend(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getModelPriceTrend',
    method: 'post',
    data: {
      data
    }
  })
}

// 单车价格策略分析 - 【车型】全车系价格策略表现 - 正负利润
export function getModelPriceProfit(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getModelPriceProfit',
    method: 'post',
    data: {
      data
    }
  })
}

// 单车价格策略分析 - 最下方的表格
export function getModelPriceStimulateItem(data) {
  return request({
    url: '/enterprise/model-terminal-support-analysis/getModelPriceStimulateItem',
    method: 'post',
    data: {
      data
    }
  })
}

