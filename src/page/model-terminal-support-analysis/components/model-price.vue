<template>
  <a-card
    :title="$t('modelTerminalSupportAnalysis.modelPrice.strategy',[])"
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
      <span style="color: #181C28;">{{ $t('modelTerminalSupportAnalysis.common.chooseModel') }}</span>
      <span>
        <a-button type="primary" class="model-select-item">本品</a-button>
        <a-button class="model-select-item">竞品1</a-button>
        <a-button class="model-select-item">竞品2</a-button>
        <a-button class="model-select-item">竞品3</a-button>
        <a-select class="model-select-item" style="width: 144px" :placeholder="$t('modelTerminalSupportAnalysis.common.chooseMore')" />
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
import { Chart } from '@/utils/charts'
import {
  getModelPriceTrend,
  getModelPriceProfit,
  getModelPriceStimulateItem
} from '@/api/model-terminal-support-analysis'

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
        price: {},
        // 正负利润相关的图
        profit: {}
      },
      // 统计表格
      countTable: {
        // data: {
        //   year: 12.5,
        //   last: 8.3,
        //   curr: 14.2,
        //   row: [[1, 2, 3, 4, 5, 6, 7]]
        // },
        data: {},
        columns: []
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getModelPriceTrend()
      this.getModelPriceProfit()
      this.getModelPriceStimulateItem()
    },
    getModelPriceTrend(params) {
      return getModelPriceTrend(params)
        .then(res => {
          this.opts.price = res.data
          this.opts.price = new Chart('bar', res.data, {
          }).getChart()
        })
    },
    getModelPriceProfit(params) {
      return getModelPriceProfit(params)
        .then(res => {
          this.opts.profit = new Chart('bar', res.data).getChart()
        })
    },
    getModelPriceStimulateItem(params) {
      return getModelPriceStimulateItem(params)
        .then(res => {
          this.countTable.data = res.data
          this.getCountTable()
        })
    },
    getCountTable() {
      const data = this.countTable.data
      this.countTable.columns = [
        {
          title: `年度销售激励： ${data.year}%`,
          children: [
            {
              title: '年度固定折扣',
              dataIndex: 'a',
              align: 'center'
            },
            {
              title: '年度考核奖励',
              dataIndex: 'b',
              align: 'center'
            }
          ]
        },
        {
          title: `9月销售激励：${data.last}%`,
          children: [
            {
              title: '奖励项',
              dataIndex: 'c',
              align: 'center'
            },
            {
              title: '奖励项',
              dataIndex: 'd',
              align: 'center'
            }
          ]
        },
        {
          title: `10月销售激励：${data.last}%`,
          children: [
            {
              title: '奖励项',
              dataIndex: 'e',
              align: 'center'
            },
            {
              title: '奖励项',
              dataIndex: 'f',
              align: 'center'
            }
          ]
        },
        {
          title: `10月统计`,
          dataIndex: 'g',
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
