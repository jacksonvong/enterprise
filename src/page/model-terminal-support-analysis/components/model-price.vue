<template>
  <a-card
    :title="$t('全车系价格策略表现',[])"
    :body-style="{padding: '16px 24px'}">
    <span slot="extra" class="extra-header-download">
      <iw-download
        type="simple"
        download-api="/market-overview-export/manf-rank"
        :download-params="{
        }"
      />
    </span>
    <div class="model-select-wrapper">
      <span style="color: #181C28;">{{ $t('选择车型：') }}</span>
      <span>
        <a-button type="primary" class="model-select-item">本品</a-button>
        <a-button class="model-select-item">竞品1</a-button>
        <a-button class="model-select-item">竞品2</a-button>
        <a-button class="model-select-item">竞品3</a-button>
        <a-select class="model-select-item"></a-select>
      </span>
    </div>
    <div style="height: 400px; padding-top: 14px">
      <iw-chart :options="opts.price" />
    </div>
    <a-divider />
    <div style="height: 400px">
      <iw-chart :options="opts.profit" />
    </div>
    <div style="margin-top: 26px">
      <a-table
        :pagination="false"
        :columns="countTable.columns"
        :data-source="countTable.data.row"
        bordered
        size="middle" />
    </div>
  </a-card>
</template>
<script>
import { Card, Button, Divider, Table, Select } from 'ant-design-vue'
import IwDownload from '@/components/download/index'
import IwChart from '@/components/charts'

export default {
  components: {
    ACard: Card,
    AButton: Button,
    ADivider: Divider,
    ATable: Table,
    ASelect: Select,
    IwDownload,
    IwChart
  },
  data() {
    return {
      // 本品
      modelsSelected: [],
      // 竞品
      competitionModels: [],
      opts: {
        // 市场指导价相关的图
        price: {
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
              end: 12
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
            },
            {
              type: 'value',
              name: '价格',
              nameLocation: 'end',
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              smooth: true,
              name: '邮件营销',
              type: 'bar',
              barMaxWidth: '38px',
              data: [120, 132, 101, 134, 90, 230, 210],
              yAxisIndex: 0
            },
            {
              smooth: true,
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310],
              yAxisIndex: 1,
              label: {
                show: true
              },
              symbolSize: 6
            }
          ]

        },
        // 正负利润相关的图
        profit: {
          color: ['#6398f5', '#f9826f'],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['正利润', '负利润'],
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
            data: ['a', 'b']
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
              name: '正利润',
              type: 'bar',
              barMaxWidth: '38px',
              data: [120, 0],
              yAxisIndex: 0,
              stack: '1'
            },
            {
              smooth: true,
              name: '负利润',
              type: 'bar',
              barMaxWidth: '38px',
              data: [0, -10],
              yAxisIndex: 0,
              stack: '1'
            }
          ]

        }
      },
      // 统计表格
      countTable: {
        data: {
          year: 12.5,
          last: 8.3,
          curr: 14.2,
          row: [[1, 2, 3, 4, 5, 6, 7]]
        },
        columns: []
      }
    }
  },
  mounted() {
    this.getCountTable()
  },
  methods: {
    getPrice() {

    },
    getCountTable() {
      const data = this.countTable.data
      this.countTable.columns = [
        {
          title: `年度销售激励： ${data.year}%`,
          children: [
            {
              title: '年度固定折扣',
              dataIndex: '0',
              align: 'center'
            },
            {
              title: '年度考核奖励',
              dataIndex: '1',
              align: 'center'
            }
          ]
        },
        {
          title: `9月销售激励：${data.last}%`,
          children: [
            {
              title: '奖励项',
              dataIndex: '2',
              align: 'center'
            },
            {
              title: '奖励项',
              dataIndex: '3',
              align: 'center'
            }
          ]
        },
        {
          title: `10月销售激励：${data.last}%`,
          children: [
            {
              title: '奖励项',
              dataIndex: '4',
              align: 'center'
            },
            {
              title: '奖励项',
              dataIndex: '5',
              align: 'center'
            }
          ]
        },
        {
          title: `10月统计`,
          dataIndex: '6',
          align: 'center'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
  .model-select-wrapper {
    line-height: 32px;

    .model-select-item {
      margin: 0 7px;
      width: 92px;
    }
  }
</style>
