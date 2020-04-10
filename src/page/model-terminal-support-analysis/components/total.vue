<template>
  <div>
    <a-card
      :title="$t('总激励走势分析',[])"
      :body-style="{padding: '16px 24px'}">
      <span slot="extra" class="extra-header-download">
        <iw-download
          type="simple"
          download-api="/market-overview-export/manf-rank"
          :download-params="{
          }"
        />
      </span>
      <div style="height: 400px">
        <iw-chart :options="opt1" />
      </div>
      <a-divider />
      <div style="height: 400px">
        <iw-chart :options="opt2" />
      </div>
    </a-card>
    <a-card
      :title="$t('总激励结构对比',[])"
      :body-style="{padding: '16px 24px'}">
      <span slot="extra" class="extra-header-download">
        <iw-download
          type="simple"
          download-api="/market-overview-export/manf-rank"
          :download-params="{
          }"
        />
      </span>
      <div style="height: 400px">
        <iw-chart :options="opt3" />
      </div>
    </a-card>
  </div>
</template>
<script>
import { Card, Divider } from 'ant-design-vue'
import IwDownload from '@/components/download/index'
import IwChart from '@/components/charts'
import _ from 'lodash'
import { Chart } from '@/utils/charts'
import { getAllExcitationAnalyze } from '@/api/model-terminal-support-analysis'

export default {
  components: {
    ACard: Card,
    ADivider: Divider,
    IwDownload,
    IwChart
  },
  props: {
    dataForm: {
      type: Object,
      default() {
        return {
        }
      }
    }
  },
  data() {
    return {
      chartAllExcitation: {
        loading: false,
        status: 0
      },
      // 车型及竞品总激励走势
      opt1: {
        color: ['#6398f5', '#36c585', '#f9826f', '#ffaa42'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告'],
          bottom: '-5px'
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            bottom: '26px',
            handleIcon:
              'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z',
            handleSize: '50%',
            start: 1,
            end: 50
          }
        ],
        grid: {
          top: '30px',
          left: '16px',
          right: '16px',
          bottom: '66px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: [
          {
            type: 'value',
            name: '销量',
            nameLocation: 'end',
            splitLine: { // 网格线
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true // 隐藏或显示
            }
          }
        ],
        series: [
          {
            smooth: true,
            name: '邮件营销',
            type: 'line',
            barMaxWidth: '38px',
            data: [120, 132, 101, 134, 90, 230, 210],
            yAxisIndex: 0,
            symbolSize: 6
          },
          {
            smooth: true,
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
            yAxisIndex: 0,
            label: {
              show: true
            },
            symbolSize: 6
          }
        ]

      },
      // 车型及竞品销量走势
      opt2: {
        color: ['#6398f5', '#36c585', '#f9826f', '#ffaa42'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告'],
          bottom: '-5px'
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            bottom: '26px',
            handleIcon:
              'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z',
            handleSize: '50%',
            start: 1,
            end: 50
          }
        ],
        grid: {
          top: '30px',
          left: '16px',
          right: '16px',
          bottom: '66px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: [
          {
            type: 'value',
            name: '销量',
            nameLocation: 'end',
            splitLine: { // 网格线
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true // 隐藏或显示
            }
          }
        ],
        series: [
          {
            smooth: true,
            name: '邮件营销',
            type: 'line',
            barMaxWidth: '38px',
            data: [120, 132, 101, 134, 90, 230, 210],
            yAxisIndex: 0,
            symbolSize: 6
          },
          {
            smooth: true,
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
            yAxisIndex: 0,
            label: {
              show: true
            },
            symbolSize: 6
          }
        ]

      },
      // 总激励结构对比
      opt3: {
        color: ['#6398f5', '#80cbc4', '#fecc4f'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['年度固定折扣', '年度考核奖励', '月度激励'],
          bottom: '-5px'
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            bottom: '26px',
            handleIcon:
              'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z',
            handleSize: '50%'
          }
        ],
        grid: {
          top: '30px',
          left: '16px',
          right: '16px',
          bottom: '66px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['A7', '云100']
        },
        yAxis: [
          {
            type: 'value',
            nameLocation: 'end',
            splitLine: { // 网格线
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true // 隐藏或显示
            }
          }
        ],
        series: [
          {
            smooth: true,
            name: '年度固定折扣',
            type: 'bar',
            barMaxWidth: '38px',
            data: [120, 56],
            yAxisIndex: 0,
            stack: '1'
          },
          {
            smooth: true,
            name: '年度考核奖励',
            type: 'bar',
            barMaxWidth: '38px',
            data: [34, 33],
            yAxisIndex: 0,
            stack: '1'
          },
          {
            smooth: true,
            name: '月度激励',
            type: 'bar',
            barMaxWidth: '38px',
            data: [34, 33],
            yAxisIndex: 0,
            stack: '1'
          }
        ]

      }
    }
  },
  watch: {
    dataForm: {
      handler() {
        if (this.dataForm.ym) {
          this.getData()
        }
      }
    }
  },
  mounted() {
    window.addEventListener('resize', _.debounce(() => {
      this.init()
    }, 100))
    if (this.dataForm.ym) {
      console.log(this.dataForm)
      this.getData()
    }
  },
  methods: {
    init() {},
    getData() {
      this.getChart()
    },
    getChart() {
      this.chartAllExcitation.loading = true
      getAllExcitationAnalyze({
        subModelName: 'C级',
        minYm: this.dataForm.ym[0],
        maxYm: this.dataForm.ym[1],
        moneyOrRatio: this.dataForm.dataType,
        isQuarter: this.dataForm.dataTimeType,
        subModelIdss: 130,
        type: 1
      })
        .then(res => {
          const data = res.data[0] || {}
          this.opt1 = new Chart('line', data, {
            smooth: true
          }).getChart()
          console.log(this.opt1)
          this.chartAllExcitation.loading = false
          this.chartAllExcitation.status = 200
        })
        .catch(err => {
          this.chartAllExcitation.loading = false
          this.chartAllExcitation.status = 500
          throw err
        })
    }
  }
}
</script>
