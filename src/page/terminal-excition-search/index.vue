<template>
  <div class="terminal-excition-search">
    <iw-banner :title="$t('modelOverview.banner.title')" />
    <div :style="{'padding-top': $store.state.app.filter!=='fixed' ? '10px' : '76px'}" class="main-content">
      <iw-filter
        :key="$store.state.app.filter!=='fixed'?'overview-analyse':''"
        :show="{market: true, dataTimeType: true, dimensionType: true, subModel: true, dataType: true}"
        :multiple="{segment: true, manfBrand: true, subModel: true}"
        :data-time-range="true"
        @change="changeDataForm"
      />
      <a-card
        :title="$t('终端激励')"
        :body-style="{padding: 0}">
        <span slot="extra" class="extra-header-download">
          <iw-download
            type="simple"
            download-api="/market-overview-export/manf-rank"
            :download-params="{
            }"
          />
        </span>
        <iw-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;border-top: 1px solid #eee;"
          row-key="key"
          header-cell-class-name="iw-table-header"
          cell-class-name="iw-table-cell"
          :tree-props="{children: 'children'}">
          <iw-table-column
            prop="time"
            label="时间"
            width="120" />
          <iw-table-column
            prop="type"
            is-expand
            label="细分市场" />
          <iw-table-column
            prop="totalIncentive"
            label="总激励" />
          <iw-table-column
            prop="discount"
            label="年度固定折扣" />
          <iw-table-column
            prop="kpi"
            label="年度考核奖励" />
          <iw-table-column
            prop="monthKpi"
            label="月度奖励" />
          <iw-table-column
            :render-header="renderHeader"
            prop="msrp"
            label="指导价" />
        </iw-table>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card, Icon } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwFilter from '@/components/filter/index'
import IwDownload from '@/components/download/index'
import { getMoney } from '@/api/terminal-excition-search'
const Vue = require('vue')
Vue.component('a-icon', Icon)
export default {
  components: {
    ACard: Card,
    IwBanner,
    IwFilter,
    IwDownload
  },
  data() {
    return {
      filterForm: {},
      rewardExcition: {
        data: {}
      },
      columns: [],
      tableData: []
    }
  },
  created() {
    this.getMoney()
  },
  methods: {
    changeDataForm(form) {
      this.filterForm = { ...this.filterForm, ...form }
    },
    renderHeader(h, { column, $index }) {
      return (
        <div>
          <span>{ column.label }</span>
          <iw-popover
            trigger='hover'
            placement='right-end'
            body-style={{ padding: '8px' }}
            show-arrow={true}
            width='null'
            popper-class='iw-popover-desc'
          >
            <div slot='reference'>
              <span class='question-circle'>
                <a-icon type='question' />
              </span>
            </div>
            <div>新能源车采用官方补贴后售价</div>
            <div>汽油车采用官方指导价</div>
          </iw-popover>
        </div>
      )
    },
    getMoney() {
      return new Promise((resolve, reject) => {
        getMoney({
        }).then(res => {
          const data = res.data || []
          this.rewardExcition.data = data[0] || {}
          this.columns = this.rewardExcition.data.columns
          this.tableData = this.rewardExcition.data.dataSource
          resolve(res)
        })
      })
    }
  }
}
</script>

<style lang="less">
.terminal-excition-search {
  .iw-table {
    .iw-table-header {
      color: #848997;
      font-weight: normal;
      background: #FAFAFA;
      border-right: 1px solid #eee;
      text-align: center;
      &:nth-last-child(2) {
        border-right: 0;
      }
    }
    .iw-table-cell {
      color: #181c28;
      text-align: center;
    }
  }
}
</style>
