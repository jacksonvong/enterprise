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
  // 整体市场分析
  'POST /api/net-big-data/terminal-reward-search/getTimeInfo': fromJSONFile('terminal-reward-search/getTimeInfo'),
  'POST /api/net-big-data/terminal-reward-search/getTypeInfo': fromJSONFile('terminal-reward-search/getTypeInfo'),
  'POST /api/net-big-data/terminal-excition-search/getMoney': fromJSONFile('terminal-excition-search/getMoney')
}
module.exports = proxy
