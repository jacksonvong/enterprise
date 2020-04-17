<template>
  <div>
    <a-card
      :title="$t('modelTerminalSupportAnalysis.month.incentiveTrend', [])"
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
        <iw-chart :options="optPrice" />
      </div>
    </a-card>
    <a-card
      :title="$t('modelTerminalSupportAnalysis.month.incentiveRhythm')"
      :body-style="{padding: '16px 24px'}">
      <div class="model-select-wrapper">
        <span style="color: #181C28;">{{ $t('modelTerminalSupportAnalysis.common.chooseModel') }}</span>
        <span>
          <a-button type="primary" class="model-select-item">本品</a-button>
          <a-button class="model-select-item">竞品1</a-button>
          <a-button class="model-select-item">竞品2</a-button>
          <a-button class="model-select-item">竞品3</a-button>
          <a-select class="model-select-item" />
        </span>
      </div>
      <a-table
        :pagination="false"
        :columns="condition.columns"
        :data-source="condition.data"
        bordered>
        <div slot="detail" slot-scope="scope" style="margin: -16px">
          <template v-if="scope === null">
            <p style="padding: 16px">
              -
            </p>
          </template>
          <template v-else>
            <div v-for="(item , index) in scope.detail" :key="index" class="detail-item">
              {{ item }}
            </div>
          </template>
        </div>
      </a-table>
    </a-card>
    <a-card
      :title="$t('年月激励结构 VS 年月激励结构')"
      :body-style="{padding: '16px 24px'}">
      <div slot="extra" class="extra-wrapper">
        <span class="extra-query">
          <span style="position: relative; right: 12px;top: 4px">
            <button class="chart-button" style="margin-right: 4px" @click="onChangeChartType('bar')">
              <a-icon type="bar-chart" :style="chartButtonStyle" :class="{ selected: query.chartType === 'bar' }" />
            </button>
            <button class="chart-button" @click="onChangeChartType('pie')">
              <a-icon type="pie-chart" :style="chartButtonStyle" :class="{ selected: query.chartType === 'pie' }" />
            </button>
          </span>
          <a-radio-group v-model="query.type" size="small">
            <a-radio-button value="a">{{ $t('modelTerminalSupportAnalysis.month.bonusType') }}</a-radio-button>
            <a-radio-button value="b">{{ $t('modelTerminalSupportAnalysis.month.bonusSubtype') }}</a-radio-button>
          </a-radio-group>
        </span>
        <span class="extra-header-download">
          <iw-download
            type="simple"
            download-api="/market-overview-export/manf-rank"
            :download-params="{
            }"
          />
        </span>
      </div>
      <div>
        <iw-chart-comparison
          :timeline="timeline"
          :comparison-bar-data="comparisonBarData"
          :comparison-pie-data="comparisonPieData"
          :chart-type="query.chartType" />
      </div>
    </a-card>
  </div>
</template>
<script>
import { Card, Button, Table, Select, Radio, Icon } from 'ant-design-vue'
import IwDownload from '@/components/download/index'
import IwChart from '@/components/charts'
import IwChartComparison from './chart-comparison'
import {
  getMonthSaleTrend,
  getMonthStimulateCondition,
  getMonthStimulateStructureComparison,
  getMonthStimulateStructureComparisonPieList
} from '@/api/model-terminal-support-analysis'
import { Chart } from '@/utils/charts'

export default {
  components: {
    ACard: Card,
    AButton: Button,
    ARadioGroup: Radio.Group,
    ARadioButton: Radio.Button,
    AIcon: Icon,
    ATable: Table,
    ASelect: Select,
    IwDownload,
    IwChart,
    IwChartComparison
  },
  data() {
    return {
      optPrice: {},
      condition: {
        data: [],
        columns: []
      },
      query: {
        type: 'a',
        chartType: 'bar' // pie
      },
      chartButtonStyle: {
        fontSize: '22px',
        color: '#B3B3C8'
      },
      timeline: [],
      comparisonBarData: [],
      comparisonPieData: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getMonthSaleTrend()
      this.getMonthStimulateCondition()
      this.getMonthStimulateStructureComparison()
      this.getMonthStimulateStructureComparisonPieList()
    },
    onChangeChartType(type) {
      this.query.chartType = type
    },
    getTableData() {
      this.condition.columns = [
        {
          title: this.$t('车型'),
          dataIndex: 'model',
          align: 'center',
          fixed: 'left',
          width: 70,
          customRender: (text, row, index) => {
            return {
              children: text,
              attrs: {
                rowSpan: index === 0 ? 4 : 0
              }
            }
          }
        },
        {
          title: this.$t('奖励大项'),
          dataIndex: 'big',
          width: 100,
          align: 'center'
        },
        {
          title: this.$t('奖励小项'),
          dataIndex: 'little',
          width: 100,
          align: 'center'
        },
        {
          title: this.$t('5月'),
          dataIndex: 'months[0]',
          align: 'center',
          scopedSlots: { customRender: 'detail' }
        }
      ]
    },
    getMonthSaleTrend() {
      return getMonthSaleTrend()
        .then(res => {
          this.optPrice = new Chart('line', res.data, {
            yAxis: { name: '%' },
            smooth: true,
            field: { type: 'percent' }
          }).getChart()
        })
    },
    getMonthStimulateCondition() {
      return getMonthStimulateCondition()
        .then(res => {
          this.condition.data = res.data
          this.getTableData()
        })
    },
    getMonthStimulateStructureComparison(params) {
      return getMonthStimulateStructureComparison(params)
        .then(res => {
          this.timeline = res.data[0].timeList
          this.comparisonBarData = res.data[0].options.map(item => {
            return new Chart('bar', item, {
              legend: {
                top: 10,
                type: 'scroll'
              },
              grid: {
                top: 50,
                right: 30
              }
            }).getChart()
          })
        })
    },
    getMonthStimulateStructureComparisonPieList(params) {
      return getMonthStimulateStructureComparisonPieList(params)
        .then(res => {
          this.comparisonPieData = res.data[0]
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-item {
    text-align: left;
    padding: 10px;
    background: #ecf3fe;
    margin-bottom: 2px;
  }

  .model-select-wrapper {
    line-height: 32px;
    margin-bottom: 20px;

    .model-select-item {
      margin: 0 7px;
      width: 92px;
    }
  }
  .extra-query {
    position: relative;
    line-height: 16px;
    top: 0;
    right: 40px;
  }
  .chart-button {
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
  }
  .selected {
    color: #2E5AA6 !important;
  }
</style>
