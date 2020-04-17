const fs = require('fs')

function fromJSONFile(filename) {
  return (req, res) => {
    const data = fs.readFileSync(`src/api/mock/data/${filename}.json`).toString()
    const json = JSON.parse(data)
    return res.json(json)
  }
}
const proxy = {
  // 查询条件
  // 'POST /api/enterprise/common/get-data-source': fromJSONFile('common/get-datasource'),
  // 'POST /api/enterprise/common/get-min-max-time': fromJSONFile('common/get-min-max-time'),
  // 'POST /api/enterprise/common/get-manfbrand': fromJSONFile('common/get-manfbrand'),
  // 'POST /api/enterprise/common/get-segment': fromJSONFile('common/get-segment'),
  // 'POST /api/enterprise/common/get-reward': fromJSONFile('common/get-reward'),
  // 'POST /api/enterprise/common/get-version': fromJSONFile('common/get-version'),
  // 'POST /api/enterprise/common/get-submodel': fromJSONFile('common/get-submodel'),
  // 'POST /api/enterprise/common/get-submodel-comp-circle': fromJSONFile('common/get-submodel-comp-circle'),
  // 'POST /api/enterprise/common/memory-condition': fromJSONFile('common/memory-condition'),
  // 厂商品牌
  'POST /api/enterprise/manfbrand-overview/getTerminalAnalyzeTableData': fromJSONFile('manfbrand-overview/getTerminalAnalyzeTableData'),
  'POST /api/enterprise/manfbrand-overview/getTerminalAnalyzeData': fromJSONFile('manfbrand-overview/getTerminalAnalyzeData'),
  'POST /api/enterprise/manfbrand-overview/saveOrder': fromJSONFile('manfbrand-overview/saveOrder'),
  // 车型
  'POST /api/enterprise/model-overview/getSegmentData': fromJSONFile('model-overview/getSegmentData'),
  'POST /api/enterprise/model-overview/getTerminalAnalyzeData': fromJSONFile('model-overview/getTerminalAnalyzeData'),
  'POST /api/enterprise/model-overview/getTerminalAnalyzeTableData': fromJSONFile('model-overview/getTerminalAnalyzeTableData'),
  'POST /api/enterprise/model-overview/saveOrder': fromJSONFile('model-overview/saveOrder'),
  // 奖励项查询
  'POST /api/enterprise/terminal-reward-search/getTimeInfo': fromJSONFile('terminal-reward-search/getTimeInfo'),
  'POST /api/enterprise/terminal-reward-search/getTypeInfo': fromJSONFile('terminal-reward-search/getTypeInfo'),
  'POST /api/enterprise/terminal-reward-search/reward-compare-list': fromJSONFile('terminal-reward-search/reward-compare-list'),
  // 终端
  'POST /api/enterprise/terminal-excition-search/getMoney': fromJSONFile('terminal-excition-search/getMoney'),

  // 单车型
  'POST /api/enterprise/model-terminal-support-analysis/getSingleModelTerminalAnalyzeData': fromJSONFile('model-terminal-support-analysis/getSingleModelTerminalAnalyzeData'),
  'POST /api/enterprise/model-terminal-support-analysis/getAllExcitationAnalyze': fromJSONFile('model-terminal-support-analysis/getAllExcitationAnalyze'),
  'POST /api/enterprise/model-terminal-support-analysis/getYearExcitationAnalyze': fromJSONFile('model-terminal-support-analysis/getYearExcitationAnalyze'),
  'POST /api/enterprise/model-terminal-support-analysis/getPattern': fromJSONFile('model-terminal-support-analysis/getPattern'),
  'POST /api/enterprise/model-terminal-support-analysis/getPie': fromJSONFile('model-terminal-support-analysis/getPie'),
  'POST /api/enterprise/model-terminal-support-analysis/getStatckBar': fromJSONFile('model-terminal-support-analysis/getStatckBar'),
  // 单车型 - 模拟接口
  'POST /api/enterprise/model-terminal-support-analysis/getTotalStimulate': fromJSONFile('model-terminal-support-analysis/getTotalStimulate'),
  'POST /api/enterprise/model-terminal-support-analysis/getTotalSaleTrend': fromJSONFile('model-terminal-support-analysis/getTotalSaleTrend'),
  'POST /api/enterprise/model-terminal-support-analysis/getTotalStimulateStructureComparison': fromJSONFile('model-terminal-support-analysis/getTotalStimulateStructureComparison'),
  'POST /api/enterprise/model-terminal-support-analysis/getTotalStimulateDetail': fromJSONFile('model-terminal-support-analysis/getTotalStimulateDetail'),
  'POST /api/enterprise/model-terminal-support-analysis/getTimeInfo': fromJSONFile('model-terminal-support-analysis/getTimeInfo'),
  'POST /api/enterprise/model-terminal-support-analysis/getTypeInfo': fromJSONFile('model-terminal-support-analysis/getTypeInfo'),
  'POST /api/enterprise/model-terminal-support-analysis/getYearStimulateComparison': fromJSONFile('model-terminal-support-analysis/getYearStimulateComparison'),
  'POST /api/enterprise/model-terminal-support-analysis/getYearStimulateStructureComparison': fromJSONFile('model-terminal-support-analysis/getYearStimulateStructureComparison'),
  'POST /api/enterprise/model-terminal-support-analysis/getYearStimulateStructureComparisonPieList': fromJSONFile('model-terminal-support-analysis/getYearStimulateStructureComparisonPieList'),
  'POST /api/enterprise/model-terminal-support-analysis/getMonthSaleTrend': fromJSONFile('model-terminal-support-analysis/getMonthSaleTrend'),
  'POST /api/enterprise/model-terminal-support-analysis/getMonthStimulateCondition': fromJSONFile('model-terminal-support-analysis/getMonthStimulateCondition'),
  'POST /api/enterprise/model-terminal-support-analysis/getMonthStimulateStructureComparison': fromJSONFile('model-terminal-support-analysis/getMonthStimulateStructureComparison'),
  'POST /api/enterprise/model-terminal-support-analysis/getMonthStimulateStructureComparisonPieList': fromJSONFile('model-terminal-support-analysis/getMonthStimulateStructureComparisonPieList'),
  'POST /api/enterprise/model-terminal-support-analysis/getProfitStructure': fromJSONFile('model-terminal-support-analysis/getProfitStructure'),
  'POST /api/enterprise/model-terminal-support-analysis/getProfitAnalyze': fromJSONFile('model-terminal-support-analysis/getProfitAnalyze'),
  'POST /api/enterprise/model-terminal-support-analysis/getProfitSaleDistribute': fromJSONFile('model-terminal-support-analysis/getProfitSaleDistribute'),
  'POST /api/enterprise/model-terminal-support-analysis/getCompetitionSituation': fromJSONFile('model-terminal-support-analysis/getCompetitionSituation'),
  'POST /api/enterprise/model-terminal-support-analysis/getModelPriceTrend': fromJSONFile('model-terminal-support-analysis/getModelPriceTrend'),
  'POST /api/enterprise/model-terminal-support-analysis/getModelPriceProfit': fromJSONFile('model-terminal-support-analysis/getModelPriceProfit'),
  'POST /api/enterprise/model-terminal-support-analysis/getModelPriceStimulateItem': fromJSONFile('model-terminal-support-analysis/getModelPriceStimulateItem')

}
module.exports = proxy
