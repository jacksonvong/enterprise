const fs = require('fs')

function fromJSONFile(filename) {
  return (req, res) => {
    const data = fs.readFileSync(`mock/data/${filename}.json`).toString()
    const json = JSON.parse(data)
    return res.json(json)
  }
}
const proxy = {
  'POST /api/net-big-data/common/get-platform-list': fromJSONFile('common/get-platform-list'),
  'POST /api/net-big-data/common/get-data-source': fromJSONFile('common/get-datasource'),
  'POST /api/net-big-data/common/get-datasource-and-time': fromJSONFile('common/get-datasource-and-time'),
  'POST /api/net-big-data/common/get-min-max-time': fromJSONFile('common/get-min-max-time'),
  'POST /api/net-big-data/common/get-manfbrand': fromJSONFile('common/get-manfbrand'),
  'POST /api/net-big-data/common/get-segment': fromJSONFile('common/get-segment'),
  'POST /api/net-big-data/common/get-reward': fromJSONFile('common/get-reward'),
  'POST /api/net-big-data/common/get-submodel': fromJSONFile('common/get-submodel'),
  'POST /api/net-big-data/submodel-analysis/get-comp-circle': fromJSONFile('submodel-analysis/get-comp-circle'),
  'POST /api/net-big-data/manfbrand-analysis/get-comp-circle': fromJSONFile('manfbrand-analysis/get-comp-circle'),
  // 厂商品牌
  'POST /api/net-big-data/manfbrand-overview/getManfBrandData': fromJSONFile('manfbrand-overview/getManfBrandData'),
  'POST /api/net-big-data/manfbrand-overview/getTerminalAnalyzeTableData': fromJSONFile('manfbrand-overview/getTerminalAnalyzeTableData'),
  'POST /api/net-big-data/manfbrand-overview/getTerminalAnalyzeData': fromJSONFile('manfbrand-overview/getTerminalAnalyzeData'),
  'POST /api/net-big-data/manfbrand-overview/saveOrder': fromJSONFile('manfbrand-overview/saveOrder'),
  // 车型
  'POST /api/net-big-data/model-overview/getSegmentData': fromJSONFile('model-overview/getSegmentData'),
  'POST /api/net-big-data/model-overview/getSubModelData': fromJSONFile('model-overview/getSubModelData'),
  'POST /api/net-big-data/model-overview/getTerminalAnalyzeData': fromJSONFile('model-overview/getTerminalAnalyzeData'),
  'POST /api/net-big-data/model-overview/getTerminalAnalyzeTableData': fromJSONFile('model-overview/getTerminalAnalyzeTableData'),
  'POST /api/net-big-data/model-overview/saveOrder': fromJSONFile('model-overview/saveOrder'),

  'POST /api/net-big-data/terminal-reward-search/getTimeInfo': fromJSONFile('terminal-reward-search/getTimeInfo'),
  'POST /api/net-big-data/terminal-reward-search/getTypeInfo': fromJSONFile('terminal-reward-search/getTypeInfo'),
  'POST /api/net-big-data/terminal-excition-search/getMoney': fromJSONFile('terminal-excition-search/getMoney')
}
module.exports = proxy
