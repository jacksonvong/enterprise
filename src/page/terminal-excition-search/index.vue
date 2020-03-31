<template>
  <div class="terminal-excition-search">
    <iw-banner :title="$t('terminalExcitionSearch.banner.title')" />
    <div :style="{'padding-top': $store.state.app.filter!=='fixed' ? '10px' : '76px'}" class="main-content">
      <iw-filter
        :key="$store.state.app.filter!=='fixed'?'overview-analyse':''"
        :show="{market: true, dataTimeType: true, dimensionType: true, subModel: true, dataType: true}"
        :multiple="{segment: true, manfBrand: true, subModel: true}"
        :data-time-range="true"
        @change="changeDataForm"
      />
      <a-card
        :title="$t('terminalExcitionSearch.table.title')"
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
            v-for="(item, key) in columns"
            :key="key"
            :prop="item.key"
            :label="item.title"
            :width="item.width"
            :render-header="renderHeader"
            :expandable="item.expandable" />
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
      if (column.property !== 'msrp') return column.label
      return (
        <div>
          <span>{ column.label }</span>
          <iw-popover
            trigger='hover'
            placement='bottom-end'
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
          this.columns = this.rewardExcition.data.columns.map(item => {
            let width = ''
            if (item.key === 'time') {
              width = 120
            }
            return {
              ...item,
              width: width
            }
          })
          this.tableData = this.rewardExcition.data.dataSource
          resolve(res)
        })
      })
    }
  }
}
</script>
