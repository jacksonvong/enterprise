<template>
  <div>
    <a-card
      :title="$t('modelTerminalSupportAnalysis.profit.competitorsTrend',[])"
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
      :title="$t('modelTerminalSupportAnalysis.profit.structureComparison', [])"
      :body-style="{padding: '16px 24px'}">
      <div slot="extra" class="extra-wrapper">
        <span class="extra-datepicker">
          {{ $t('modelTerminalSupportAnalysis.profit.time') }}
          <iw-date-picker
            v-model="dateVal1"
            type="month"
            size="mini"
            style="width: 130px;"
            align="right"
            :placeholder="$t('modelTerminalSupportAnalysis.common.chooseTime')" />
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
      <a-row :gutter="20">
        <a-col v-for="(item, index) in profitStructureData" :key="index" :span="6">
          <iw-stack-bar :data="item" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import { Card, Row, Col } from 'ant-design-vue'
import IwDownload from '@/components/download/index'
import IwChart from '@/components/charts'
import IwStackBar from './custom-stack-bar'
import { getProfitAnalyze, getProfitStructure } from '@/api/model-terminal-support-analysis'
import { Chart } from '@/utils/charts'

export default {
  components: {
    ACard: Card,
    ARow: Row,
    ACol: Col,
    IwDownload,
    IwChart,
    IwStackBar
  },
  data() {
    return {
      optPrice: {},
      dateVal1: '',
      profitStructureData: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getProfitAnalyze()
      this.getProfitStructure()
    },
    getProfitAnalyze(params) {
      return getProfitAnalyze(params)
        .then(res => {
          // this.optPrice = res.data
          this.optPrice = new Chart('line', res.data, {
            yAxis: { name: '%' },
            smooth: true,
            field: { type: 'percent' }
          }).getChart()
        })
    },
    getProfitStructure(params) {
      return getProfitStructure(params)
        .then(res => {
          this.profitStructureData = res.data[0].data
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .extra-wrapper{
    position: relative;
    .extra-datepicker{
      position: relative;
      line-height: 16px;
      top: 0;
      right: 40px;
    }
  }
</style>
