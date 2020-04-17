<template>
  <div>
    <a-card
      :title="$t('modelTerminalSupportAnalysis.year.annualIncentive',[])"
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
        <iw-chart :options="mainOpt" />
      </div>
    </a-card>
    <a-card
      :body-style="{padding: '16px 24px'}"
    >
      <div slot="title">
        <span>{{ $t('modelTerminalSupportAnalysis.year.structureComparison', []) }}</span>
        <span style="position:absolute; top: 9px;">
          <iw-popover
            trigger="hover"
            placement="right-start"
            :body-style="{padding: '10px'}"
            :offset="{top: -17}"
            :show-arrow="true"
            :width="null"
            popper-class="iw-popover-desc"
          >
            <div slot="reference">
              <div class="question-circle">
                <a-icon class="question" type="question" />
              </div>
            </div>
            <div class="description">
              <div class="title">全局说明</div>
              <p>全局说明...</p>
            </div>
          </iw-popover>
        </span>
      </div>
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
import { Card, Radio, Icon } from 'ant-design-vue'
import IwDownload from '@/components/download/index'
import IwChart from '@/components/charts'
import {
  getYearStimulateComparison,
  getYearStimulateStructureComparison,
  getYearStimulateStructureComparisonPieList
} from '@/api/model-terminal-support-analysis'
import IwChartComparison from './chart-comparison'
import { Chart } from '@/utils/charts'

export default {
  components: {
    ACard: Card,
    IwDownload,
    IwChart,
    ARadioGroup: Radio.Group,
    ARadioButton: Radio.Button,
    AIcon: Icon,
    IwChartComparison
  },
  data() {
    return {
      // 单车型与竞品年度激励对比
      mainOpt: {},
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
      this.getYearStimulateComparison()
      this.getYearStimulateStructureComparison()
      this.getYearStimulateStructureComparisonPieList()
    },
    onChangeChartType(type) {
      this.query.chartType = type
    },
    getYearStimulateComparison(params) {
      return getYearStimulateComparison(params)
        .then(res => {
          // this.mainOpt = res.data
          this.mainOpt = new Chart('bar', res.data, {
            color: ['#6398f5', '#80cbc4'],
            yAxis: { name: '%' },
            field: { type: 'percent' }
          }).getChart()
        })
    },
    getYearStimulateStructureComparison(params) {
      return getYearStimulateStructureComparison(params)
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
    getYearStimulateStructureComparisonPieList(params) {
      return getYearStimulateStructureComparisonPieList(params)
        .then(res => {
          this.comparisonPieData = res.data[0]
        })
    }
  }
}
</script>
<style lang="scss" scoped>
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
