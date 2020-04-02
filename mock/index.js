const fs = require('fs')

function fromJSONFile(filename) {
  return (req, res) => {
    const data = fs.readFileSync(`mock/data/${filename}.json`).toString()
    const json = JSON.parse(data)
    return res.json(json)
  }
}
const proxy = {
  // 查询条件
  'POST /api/enterprise/common/get-data-source': fromJSONFile('common/get-datasource'),
  'POST /api/enterprise/common/get-datasource-and-time': fromJSONFile('common/get-datasource-and-time'),
  'POST /api/enterprise/common/get-min-max-time': fromJSONFile('common/get-min-max-time'),
  'POST /api/enterprise/common/get-manfbrand': fromJSONFile('common/get-manfbrand'),
  'POST /api/enterprise/common/get-segment': fromJSONFile('common/get-segment'),
  'POST /api/enterprise/common/get-reward': fromJSONFile('common/get-reward'),
  'POST /api/enterprise/common/get-version': fromJSONFile('common/get-version'),
  'POST /api/enterprise/common/get-submodel': fromJSONFile('common/get-submodel'),
  'POST /api/enterprise/common/get-default-manfbrand': fromJSONFile('common/get-default-manfbrand'),
  'POST /api/enterprise/common/get-default-submodel': fromJSONFile('common/get-default-submodel'),
  'POST /api/enterprise/common/get-manbrand-comp-circle': fromJSONFile('common/get-manbrand-comp-circle'),
  'POST /api/enterprise/common/get-submodel-comp-circle': fromJSONFile('common/get-submodel-comp-circle'),
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
  // 终端
  'POST /api/enterprise/terminal-excition-search/getMoney': fromJSONFile('terminal-excition-search/getMoney'),
  // 单车型
  'POST /api/enterprise/model-terminal-support-analysis/getSingleModelTerminalAnalyzeData': fromJSONFile('model-terminal-support-analysis/getSingleModelTerminalAnalyzeData')

}
module.exports = proxy
