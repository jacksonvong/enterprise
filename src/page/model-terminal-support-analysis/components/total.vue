<template>
  <div>
    <!--    <a-card>-->
    <!--      <div style="height: 300px">-->
    <!--        <iw-chart :options="opt4" />-->
    <!--      </div>-->
    <!--    </a-card>-->
    <!--    <a-card>-->
    <!--      <div style="height: 400px;">-->
    <!--        <iw-chart :options="opt5" />-->
    <!--      </div>-->
    <!--    </a-card>-->
    <a-card
      :title="$t('modelTerminalSupportAnalysis.total.incentiveTrend',[])"
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
      :title="$t('modelTerminalSupportAnalysis.total.incentiveStructure',[])"
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
    <a-card
      :title="$t('modelTerminalSupportAnalysis.total.bonusItemDetail',[])"
      :body-style="{padding: '0'}">
      <div class="query-filter">
        <span class="title-span">{{ $t('modelTerminalSupportAnalysis.common.time') }}</span>
        <iw-date-picker
          v-model="queryFilter.date"
          :editable="false"
          format="yyyy/MM/dd"
          value-format="yyyyMMdd"
          type="daterange"
          size="medium "
          style="width: 220px;"
          align="right"
          :placeholder="$t('modelTerminalSupportAnalysis.common.chooseTime')" />
        <span class="title-span">{{ $t('modelTerminalSupportAnalysis.common.bonusType') }}</span>
        <!--<a-select v-model="queryFilter.type" class="model-select-item" style="width: 120px" />-->
        <iw-select v-model="queryFilter.type" size="medium" />
        <div style="margin: 16px 0" />
        <span class="title-span" style="color: #181C28;">{{ $t('modelTerminalSupportAnalysis.common.chooseModel') }}</span>
        <span>
          <a-button type="primary" class="model-select-item">本品</a-button>
          <a-button class="model-select-item">竞品1</a-button>
          <a-button class="model-select-item">竞品2</a-button>
          <a-button class="model-select-item">竞品3</a-button>
          <!--<a-select v-model="queryFilter.model" class="model-select-item" style="width: 120px" />-->
          <iw-select v-model="queryFilter.model" size="medium" />
        </span>
      </div>
      <a-card
        :tab-list="tabListTitle"
        :active-tab-key="titleKey"
        :head-style="{padding: 0}"
        :body-style="{padding: 0}"
        @tabChange="key => onTabChange(key)"
      >
        <IwRewardComparision v-if="titleKey=='1'" :data="rewardComparision.data" :limit-height="500" />
        <IwRewardCategoryDetail v-if="titleKey=='2'" :data="rewardCategoryDetail.data" :limit-height="500" />
      </a-card>
    </a-card>
  </div>
</template>
<script>
import { Card, Button, Divider, Select } from 'ant-design-vue'
import IwDownload from '@/components/download/index'
import IwChart from '@/components/charts'
// import _ from 'lodash'
import { Chart } from '@/utils/charts'
// import { getAllExcitationAnalyze, getYearExcitationAnalyze, getPattern, getPie, getStatckBar } from '@/api/model-terminal-support-analysis'
import {
  getTotalStimulate,
  getTotalSaleTrend,
  getTotalStimulateStructureComparison,
  getTimeInfo,
  getTypeInfo
} from '@/api/model-terminal-support-analysis'
import IwRewardComparision from '../../terminal-reward-search/reward-comparision/index' // 奖励项对比
import IwRewardCategoryDetail from '../../terminal-reward-search/reward-category-detail/index' // 奖励项分类明细

export default {
  components: {
    ACard: Card,
    AButton: Button,
    ADivider: Divider,
    ASelect: Select,
    IwDownload,
    IwChart,
    IwRewardComparision,
    IwRewardCategoryDetail
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
      opt1: {},
      // 车型及竞品销量走势
      opt2: {},
      // 总激励结构对比
      opt3: {},
      // 奖励项明细 - 过滤
      queryFilter: {
        // 时间
        date: '',
        // 奖励类型
        type: '',
        // 选择车型
        model: ''
      },
      titleKey: '1',
      tabListTitle: [
        {
          key: '1',
          tab: this.$t('modelTerminalSupportAnalysis.total.bonusItemComparison')
        },
        {
          key: '2',
          tab: this.$t('modelTerminalSupportAnalysis.total.bonusItemDetail')
        }
      ],
      rewardComparision: {
        data: {}
      },
      rewardCategoryDetail: {
        data: {}
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getTotalStimulate()
      this.getTotalSaleTrend()
      this.getTotalStimulateStructureComparison()
      this.getTimeInfo()
      this.getTypeInfo()
    },
    onTabChange(value) {
      this.titleKey = value
    },
    getTotalStimulate(params) {
      return getTotalStimulate(params)
        .then(res => {
          // this.opt1 = res.data
          this.opt1 = new Chart('line', res.data, {
            title: { text: this.$t('modelTerminalSupportAnalysis.total.selfAndCompetitorsTrend', []) },
            yAxis: { name: '%' },
            field: { type: 'percent' },
            smooth: true,
            itemStyle: {
              normal: {
                barBorderRadius: 2
              }
            }
          }).getChart()
        })
    },
    getTotalSaleTrend(params) {
      return getTotalSaleTrend(params)
        .then(res => {
          // this.opt2 = res.data
          this.opt2 = new Chart('line', res.data, {
            title: { text: this.$t('modelTerminalSupportAnalysis.total.salesTrend', []) },
            yAxis: { name: '' },
            smooth: true,
            itemStyle: {
              normal: {
                barBorderRadius: 2
              }
            }
          }).getChart()
        })
    },
    getTotalStimulateStructureComparison(params) {
      return getTotalStimulateStructureComparison(params)
        .then(res => {
          // this.opt3 = res.data
          this.opt3 = new Chart('bar', res.data, {
            title: {},
            'grid': {
              'top': '30px',
              'left': '16px',
              'right': '16px',
              'bottom': '66px',
              'containLabel': true
            },
            yAxis: { name: '%' },
            field: { type: 'percent' }
          }).getChart()
        })
    },
    getTimeInfo() {
      return new Promise((resolve, reject) => {
        getTimeInfo({}).then(res => {
          console.log(res)
          const data = res.data || []
          this.rewardComparision.data = data[0] || {}
          resolve(res)
        })
      })
    },
    getTypeInfo() {
      return new Promise((resolve, reject) => {
        getTypeInfo({}).then(res => {
          console.log(res)
          const data = res.data || []
          this.rewardCategoryDetail.data = data[0] || {}
          resolve(res)
        })
      })
    }
  }
  // watch: {
  //   dataForm: {
  //     handler() {
  //       if (this.dataForm.dataTime) {
  //         this.getData()
  //       }
  //     }
  //   }
  // },
  // mounted() {
  //   window.addEventListener('resize', _.debounce(() => {
  //     this.init()
  //   }, 100))
  //   if (this.dataForm.dataTime) {
  //     this.getData()
  //     this.opt3 = new Chart('bar', this.opt3).getChart()
  //   }
  // },
  // methods: {
  //   init() {},
  //   getData() {
  //     this.getChart()
  //     this.getChart2()
  //     this.getChart3()
  //     this.getChart4()
  //     this.getChart5()
  //   },
  //   getChart() {
  //     this.chartAllExcitation.loading = true
  //     getAllExcitationAnalyze({
  //       subModelName: 'C级',
  //       minYm: this.dataForm.dataTime[0],
  //       maxYm: this.dataForm.dataTime[1],
  //       moneyOrRatio: this.dataForm.dataType,
  //       isQuarter: this.dataForm.dataTimeType,
  //       subModelIdss: 130,
  //       type: 1
  //     })
  //       .then(res => {
  //         const data = res.data[0] || {}
  //         this.opt1 = new Chart('line', data, {
  //           yAxis: { name: '元' },
  //           smooth: true,
  //           itemStyle: {
  //             normal: {
  //               barBorderRadius: 2
  //             }
  //           }
  //         }).getChart()
  //         this.chartAllExcitation.loading = false
  //         this.chartAllExcitation.status = 200
  //       })
  //       .catch(err => {
  //         this.chartAllExcitation.loading = false
  //         this.chartAllExcitation.status = 500
  //         throw err
  //       })
  //   },
  //   getChart2() {
  //     this.chartAllExcitation.loading = true
  //     getPattern({
  //       subModelName: 'C级',
  //       minYm: this.dataForm.dataTime[0],
  //       maxYm: this.dataForm.dataTime[1],
  //       moneyOrRatio: this.dataForm.dataType,
  //       isQuarter: this.dataForm.dataTimeType,
  //       subModelIdss: 130,
  //       type: 1
  //     })
  //       .then(res => {
  //         const data = res.data || {}
  //         this.opt2 = new Chart('scatter', data, {
  //           xAxis: { name: '利润(%)' },
  //           yAxis: { name: '同比(%)' },
  //           fields: [
  //             { title: '车型', type: '', key: 4 },
  //             { name: '利润', type: 'percent', key: 0, unit: '%' },
  //             { name: '同比', type: 'percent', key: 1, unit: '%' },
  //             { name: '销量', type: 'normal', key: 2, unit: '' }
  //           ]
  //         }).getChart()
  //         this.chartAllExcitation.loading = false
  //         this.chartAllExcitation.status = 200
  //       })
  //       .catch(err => {
  //         this.chartAllExcitation.loading = false
  //         this.chartAllExcitation.status = 500
  //         throw err
  //       })
  //   },
  //   getChart3() {
  //     this.chartAllExcitation.loading = true
  //     getYearExcitationAnalyze({
  //       subModelName: 'C级',
  //       minYm: this.dataForm.dataTime[0],
  //       maxYm: this.dataForm.dataTime[1],
  //       moneyOrRatio: this.dataForm.dataType,
  //       isQuarter: this.dataForm.dataTimeType,
  //       subModelIdss: 130,
  //       type: 1
  //     })
  //       .then(res => {
  //         const data = res.data[0] || {}
  //         this.opt3 = new Chart('bar', data, {
  //           yAxis: { name: '元' },
  //           color: ['#4182F3', '#36C585', '#FFA940']
  //         }).getChart()
  //         this.chartAllExcitation.loading = false
  //         this.chartAllExcitation.status = 200
  //       })
  //       .catch(err => {
  //         this.chartAllExcitation.loading = false
  //         this.chartAllExcitation.status = 500
  //         throw err
  //       })
  //   },
  //   getChart4() {
  //     this.chartAllExcitation.loading = true
  //     getPie({
  //       subModelName: 'C级',
  //       minYm: this.dataForm.dataTime[0],
  //       maxYm: this.dataForm.dataTime[1],
  //       moneyOrRatio: this.dataForm.dataType,
  //       isQuarter: this.dataForm.dataTimeType,
  //       subModelIdss: 130,
  //       type: 1
  //     })
  //       .then(res => {
  //         const data = res.data || {}
  //         this.opt4 = new Chart('pie', data, {
  //           legend: {
  //             top: 10
  //           },
  //           grid: {
  //             top: 0
  //           }
  //         }).getChart()
  //         this.chartAllExcitation.loading = false
  //         this.chartAllExcitation.status = 200
  //       })
  //       .catch(err => {
  //         this.chartAllExcitation.loading = false
  //         this.chartAllExcitation.status = 500
  //         throw err
  //       })
  //   },
  //   getChart5() {
  //     this.chartAllExcitation.loading = true
  //     getStatckBar({
  //       subModelName: 'C级',
  //       minYm: this.dataForm.dataTime[0],
  //       maxYm: this.dataForm.dataTime[1],
  //       moneyOrRatio: this.dataForm.dataType,
  //       isQuarter: this.dataForm.dataTimeType,
  //       subModelIdss: 130,
  //       type: 1
  //     })
  //       .then(res => {
  //         const data = res.data || {}
  //         this.opt5 = new Chart('bar', data, {
  //         }).getChart()
  //         this.chartAllExcitation.loading = false
  //         this.chartAllExcitation.status = 200
  //       })
  //       .catch(err => {
  //         this.chartAllExcitation.loading = false
  //         this.chartAllExcitation.status = 500
  //         throw err
  //       })
  //   }
  // }
}
</script>
<style lang="scss" scoped>
  .query-filter {
    margin: 16px 0;

    & > * {
      margin: 0 6px;
    }

    .title-span {
      display: inline-block;
      width: 100px;
      font-size: 14px;
      text-align: right;
    }
  }

  .model-select-item {
    margin: 0 7px;
    width: 92px;
  }
</style>
