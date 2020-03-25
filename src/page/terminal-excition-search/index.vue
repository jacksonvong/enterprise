<template>
  <div class="terminal-excition-search">
    <iw-banner :title="$t('modelOverview.banner.title')" />
    <div :style="{'padding-top': $store.state.app.filter!=='fixed' ? '10px' : '76px'}" class="main-content">
      <iw-filter
        :id="$store.state.app.filter!=='fixed'?'overview-analyse':''"
        :show="{market: true, dataTimeType: true, dimensionType: true, subModel: true, dataType: true}"
        :multiple="{segment: true, manfBrand: true, subModel: true}"
        :data-time-range="true"
        @change="changeDataForm"
      />
      <a-card :title="$t('终端激励')">
        <iw-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <iw-table-column
            prop="date"
            label="日期"
            sortable
            width="180">
          </iw-table-column>
          <iw-table-column
            prop="name"
            label="姓名"
            sortable
            width="180">
          </iw-table-column>
          <iw-table-column
            prop="address"
            label="地址">
          </iw-table-column>
        </iw-table>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwFilter from '@/components/filter/index'
import { getMoney } from '@/api/terminal-excition-search'
export default {
  components: {
    ACard: Card,
    IwBanner,
    IwFilter
  },
  data() {
    return {
      filterForm: {},
      rewardExcition: {
        data: {}
      },
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableData1: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        hasChildren: true
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created() {
    this.getMoney()
  },
  methods: {
    changeDataForm(form) {
      console.log(form)
      this.filterForm = { ...this.filterForm, ...form }
    },
    getMoney() {
      return new Promise((resolve, reject) => {
        getMoney({
        }).then(res => {
          console.log(res)
          const data = res.data || []
          this.rewardExcition.data = data[0] || {}
          resolve(res)
        })
      })
    }
  }
}
</script>
