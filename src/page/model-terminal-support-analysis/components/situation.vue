<template>
  <div>
    <a-card
      :body-style="{padding: '16px 24px'}">
      <div slot="title">
        <span>{{ $t('modelTerminalSupportAnalysis.situation.distribution',[]) }}</span>
        <span class="title-extra">
          {{ $t('生命周期：新车型',[]) }}
        </span>
      </div>
      <div slot="extra" class="extra-wrapper">
        <span class="extra-datepicker">
          {{ $t('modelTerminalSupportAnalysis.common.coveredPeriod') }}：
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
      <div style="height: 495px" class="chart-box">
        <iw-chart :options="opt1" />
        <div class="left-top">
          {{ $t('modelTerminalSupportAnalysis.situation.distribution4.name') }}
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
              <p>{{ $t('modelTerminalSupportAnalysis.situation.distribution4.desc') }}</p>
            </div>
          </iw-popover>
        </div>
        <div class="right-top">
          {{ $t('modelTerminalSupportAnalysis.situation.distribution1.name') }}
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
              <p>{{ $t('modelTerminalSupportAnalysis.situation.distribution1.desc') }}</p>
            </div>
          </iw-popover>
        </div>
        <div class="right-bottom">
          {{ $t('modelTerminalSupportAnalysis.situation.distribution2.name') }}
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
              <p>{{ $t('modelTerminalSupportAnalysis.situation.distribution2.desc') }}</p>
            </div>
          </iw-popover>
        </div>
        <div class="left-bottom">
          {{ $t('modelTerminalSupportAnalysis.situation.distribution3.name') }}
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
              <p>{{ $t('modelTerminalSupportAnalysis.situation.distribution3.desc') }}</p>
            </div>
          </iw-popover>
        </div>
      </div>
    </a-card>
    <a-card
      :body-style="{padding: '16px 24px'}">
      <div slot="title">
        <span>{{ $t('竞争圈竞争格局分析图') }}</span>
        <span class="title-extra">
          {{ $t('生命周期：新车型',[]) }}
        </span>
      </div>
      <div slot="extra" class="extra-wrapper">
        <span class="extra-datepicker">
          对比时间：
          <iw-date-picker
            v-model="dateVal1"
            type="month"
            size="mini"
            style="width: 130px;"
            align="right"
            placeholder="选择日期" />
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
      <div style="height: 495px" class="chart-box">
        <iw-chart :options="opt2" />
        <div class="left-top">
          {{ $t('modelTerminalSupportAnalysis.situation.circle4.name') }}
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
              <p>{{ $t('modelTerminalSupportAnalysis.situation.circle4.desc') }}</p>
            </div>
          </iw-popover>
        </div>
        <div class="right-top">
          {{ $t('modelTerminalSupportAnalysis.situation.circle1.name') }}
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
              <p>{{ $t('modelTerminalSupportAnalysis.situation.circle1.desc') }}</p>
            </div>
          </iw-popover>
        </div>
        <div class="right-bottom">
          {{ $t('modelTerminalSupportAnalysis.situation.circle2.name') }}
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
              <p>{{ $t('modelTerminalSupportAnalysis.situation.circle2.desc') }}</p>
            </div>
          </iw-popover>
        </div>
        <div class="left-bottom">
          {{ $t('modelTerminalSupportAnalysis.situation.circle3.name') }}
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
              <p>{{ $t('modelTerminalSupportAnalysis.situation.circle3.desc') }}</p>
            </div>
          </iw-popover>
        </div>
      </div>
    </a-card>
  </div>
</template>
<script>
import { Card, Icon } from 'ant-design-vue'
import IwDownload from '@/components/download/index'
import IwChart from '@/components/charts'
import { Chart } from '@/utils/charts'
import {
  getProfitSaleDistribute,
  getCompetitionSituation
} from '@/api/model-terminal-support-analysis'

export default {
  components: {
    ACard: Card,
    AIcon: Icon,
    IwDownload,
    IwChart
  },
  data() {
    return {
      dateVal1: '',
      dateVal2: '',
      // opt1: {
      //   visualMap: {
      //     type: 'continuous',
      //     show: true,
      //     max: 100,
      //     inRange: {
      //       symbolSize: [20, 120]
      //     },
      //     calculable: true,
      //     top: 0,
      //     right: 0,
      //     orient: 'horizontal',
      //     borderColor: '#f7f7f7',
      //     borderWidth: 2,
      //     padding: [6, 20]
      //   },
      //   color: ['#6398f5', '#cadcfc'],
      //   grid: {
      //     left: 50,
      //     right: 50,
      //     top: 60,
      //     bottom: 50
      //   },
      //   xAxis: {
      //     name: '利润',
      //     nameLocation: 'end',
      //     min: -50,
      //     max: 50,
      //     axisLabel: {
      //       show: true,
      //       align: 'center'
      //     },
      //     splitLine: {
      //       show: false
      //     }
      //   },
      //   yAxis: {
      //     name: '销售同比',
      //     nameLocation: 'end',
      //     min: -100,
      //     max: 100,
      //     axisLabel: {
      //       show: true,
      //       align: 'center',
      //       alignWithLabel: 'center'
      //     },
      //     splitLine: {
      //       show: false
      //     }
      //   },
      //   series: [{
      //     data: [
      //       [10.0, 89.04, 4],
      //       [10.0, -69.04, 55]
      //     ],
      //     type: 'scatter'
      //   }]
      // }
      opt1: {},
      opt2: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getProfitSaleDistribute()
      this.getCompetitionSituation()
    },
    getProfitSaleDistribute(params) {
      return getProfitSaleDistribute(params)
        .then(res => {
          this.opt1 = new Chart('scatter', res.data.option, {
            xAxis: { name: this.$t('modelTerminalSupportAnalysis.situation.profit') + '(%)' },
            yAxis: { name: this.$t('modelTerminalSupportAnalysis.situation.yoy') + '(%)' },
            fields: [
              { title: this.$t('modelTerminalSupportAnalysis.situation.model'), type: '', key: 4 },
              { name: this.$t('modelTerminalSupportAnalysis.situation.profit'), type: 'percent', key: 0, unit: '%' },
              { name: this.$t('modelTerminalSupportAnalysis.situation.yoy'), type: 'percent', key: 1, unit: '%' },
              { name: this.$t('modelTerminalSupportAnalysis.situation.sales'), type: 'normal', key: 2, unit: '' }
            ]
          }).getChart()
        })
    },
    getCompetitionSituation(params) {
      return getCompetitionSituation(params)
        .then(res => {
          this.opt2 = new Chart('scatter', res.data.option, {
            xAxis: { name: this.$t('modelTerminalSupportAnalysis.situation.totalIncentive') + '(%)' },
            yAxis: { name: this.$t('modelTerminalSupportAnalysis.situation.msMom') + '(%)' },
            fields: [
              { title: this.$t('modelTerminalSupportAnalysis.situation.model'), type: '', key: 4 },
              { name: this.$t('modelTerminalSupportAnalysis.situation.totalIncentive'), type: 'percent', key: 0, unit: '%' },
              { name: this.$t('modelTerminalSupportAnalysis.situation.msMom'), type: 'percent', key: 1, unit: '%' }
            ]
          }).getChart()
        })
    }
  }
}
</script>
<style lang="scss">
  .extra-wrapper{
    position: relative;
    .extra-datepicker{
      position: relative;
      line-height: 16px;
      top: 0;
      right: 40px;
    }
  }

  .title-extra {
    position:relative;
    left: 14px;
    font-size: 12px;
    color: #7F8593;
  }

  .chart-box {
    position: relative;

    .left-top{
      position: absolute;
      z-index: 1;
      left: 70px;
      top: 100px;
      font-size: 12px;
      color: #329ACE;
    }
    .right-top{
      position: absolute;
      z-index: 1;
      right: 60px;
      top: 100px;
      font-size: 12px;
      color: #36C585;
    }
    .right-bottom{
      position: absolute;
      z-index: 1;
      right: 60px;
      bottom: 50px;
      font-size: 12px;
      color: #40D3F4 ;
    }
    .left-bottom {
      position: absolute;
      z-index: 1;
      left: 70px;
      bottom: 50px;
      font-size: 12px;
      color: #FFA941 ;
    }
  }
</style>
