<template>
  <div class="model-terminal-support-analysis">
    <iw-banner :title="$t('modelOverview.banner.title')" />
    <div :style="{'padding-top': $store.state.app.filter!=='fixed' ? '10px' : '94px'}" class="main-content">
      <iw-filter
        :id="$store.state.app.filter!=='fixed'?'overview-analyse':''"
        :show="{ dataTimeType: true, dataSource: true, subModel: true, competitor: true, versionType: true, version: true }"
        :multiple="{subModel: false}"
        @change="handleFilterChange"
      />
      <iw-filter-radio @change="handleFilterRadioChange" />
      <a-card :body-style="{padding: '0'}">
        <a-spin :spinning="tableData.loading">
          <iw-table
            v-if="tableData.data.length>0"
            :data="tableData.data"
            style="width: 100%;margin-bottom: 20px;border-top: 1px solid #eee;"
            row-key="key"
            header-cell-class-name="iw-table-header"
            cell-class-name="iw-table-cell">
            <iw-table-column
              :label="tableData.columns[0].title"
              fixed
              width="180">
              <template slot-scope="scope">
                {{ scope.row.carModel }}
              </template>
            </iw-table-column>
            <iw-table-column
              :label="tableData.columns[1].title"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.salesAcc }}</span>/<span :class="getClass(scope.row.salesAccYoYValue)">{{ scope.row.salesAccYoYValue }}</span>
              </template>
            </iw-table-column>
            <iw-table-column
              :label="tableData.columns[2].title"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.sales }}</span>/<span :class="getClass(scope.row.salesYoYValue)">{{ scope.row.salesYoYValue }}</span>
              </template>
            </iw-table-column>
            <iw-table-column
              :label="tableData.columns[3].title"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.yearDiscount }}</span>/<span :class="getClass(scope.row.yearMomDiscount)">{{ scope.row.yearMomDiscount | toPercent(1, true, '%', 1) }}</span>
              </template>
            </iw-table-column>
            <iw-table-column
              :label="tableData.columns[4].title"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.yearKPI }}</span>/<span :class="getClass(scope.row.yearMomKPI)">{{ scope.row.yearMomKPI | toPercent(1, true, '%', 1) }}</span>
              </template>
            </iw-table-column>
            <iw-table-column
              :label="tableData.columns[5].title"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.monthExcitation }}</span>/<span :class="getClass(scope.row.monthMoMValue)">{{ scope.row.monthMoMValue | toPercent(1, true, '%', 1) }}</span>
              </template>
            </iw-table-column>
            <iw-table-column
              :label="tableData.columns[6].title"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.tp }}</span>
              </template>
            </iw-table-column>
            <iw-table-column
              :label="tableData.columns[7].title"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.profit }}</span>/<span :class="getClass(scope.row.profitMoMValue)">{{ scope.row.profitMoMValue | toPercent(1, true, '%', 1) }}</span>
              </template>
            </iw-table-column>
          </iw-table>
        </a-spin>
      </a-card>
      <a-card
        :tab-list="tabListTitle"
        :active-tab-key="titleKey"
        class="ant-card-shortline"
        :head-style="{padding: 0}"
        :body-style="{padding: '15px 0 0 0',background: '#f5f5f5'}"
        @tabChange="key => onTabChange(key)"
      />
      <template v-for="(item, key) in tabListTitle">
        <component :is="item.component" v-if="titleKey===item.key" :key="key" :data-form="dataForm" />
      </template>
    </div>
  </div>
</template>

<script>
import { Card, Spin } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwFilter from '@/components/filter/index'
import IwFilterRadio from '@/components/filter/radio'
import IwTotal from './components/total'
import IwYear from './components/year'
import IwMonth from './components/month'
import IwProfit from './components/profit'
import IwSituation from './components/situation'
import IwModelPrice from './components/model-price'
import _ from 'lodash'
import { getSingleModelTerminalAnalyzeData } from '@/api/model-terminal-support-analysis'
export default {
  components: {
    ACard: Card,
    ASpin: Spin,
    IwBanner,
    IwFilter,
    IwFilterRadio,
    IwTotal,
    IwYear,
    IwMonth,
    IwProfit,
    IwSituation,
    IwModelPrice
  },
  data() {
    return {
      dataForm: {},
      // 表格
      tableData: {
        columns: [],
        data: [],
        status: 0,
        loading: false
      },
      titleKey: '1',
      tabListTitle: [
        {
          key: '1',
          tab: this.$t('modelTerminalSupportAnalysis.tabs.total'),
          component: 'IwTotal'
        },
        {
          key: '2',
          tab: this.$t('modelTerminalSupportAnalysis.tabs.year'),
          component: 'IwYear'
        },
        {
          key: '3',
          tab: this.$t('modelTerminalSupportAnalysis.tabs.month'),
          component: 'IwMonth'
        },
        {
          key: '4',
          tab: this.$t('modelTerminalSupportAnalysis.tabs.profit'),
          component: 'IwProfit'
        },
        {
          key: '5',
          tab: this.$t('modelTerminalSupportAnalysis.tabs.situation'),
          component: 'IwSituation'
        },
        {
          key: '6',
          tab: this.$t('modelTerminalSupportAnalysis.tabs.modelPrice'),
          component: 'IwModelPrice'
        }
      ]
    }
  },
  watch: {
    dataForm: {
      handler() {
        if (this.dataForm.dataTime) {
          this.getData()
        }
      },
      deep: true
    }
  },
  mounted() {
    window.addEventListener('resize', _.debounce(() => {
      this.init()
    }, 100))
    if (this.dataForm.dataTime) {
      this.getData()
    }
  },
  methods: {
    init() {},
    handleFilterChange(form) {
      console.log('form', form)
      this.dataForm = { ...this.dataForm, ...form }
    },
    handleFilterRadioChange() {},
    getClass(item) {
      if (item === '' || item === '-' || item === '0' || item === '0.0%') return 'font-black'
      return item.indexOf('-') === 0 ? 'font-red' : 'font-green'
    },
    onTabChange(value) {
      this.titleKey = value
    },
    // API
    async getData() {
      this.getTableData()
    },
    getTableData() {
      getSingleModelTerminalAnalyzeData({
        ym: this.dataForm.dataTime,
        maxYm: this.dataForm.maxYm,
        dataSource: this.dataForm.dataSource,
        moneyOrRatio: this.dataForm.dataType,
        isQuarter: this.dataForm.dataTimeType,
        myIds: 8318,
        segment: this.segmentName
      })
        .then(res => {
          const data = res.data[0] || {}
          console.log(data)
          this.tableData.columns = data.data.columns || []
          this.tableData.data = data.data.dataSource || []
          this.tableData.loading = false
          this.tableData.status = 200
        })
        .catch(err => {
          this.tableData.loading = false
          this.tableData.status = 500
          throw err
        })
    }
  }
}
</script>

<style lang="less" scoped>
.model-terminal-support-analysis {
  .iw-table {
    font-size: 14px;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }
}
</style>
