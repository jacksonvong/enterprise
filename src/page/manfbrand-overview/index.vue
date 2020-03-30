<template>
  <div class="manfbrand-overview">
    <iw-banner :title="$t('manfbrandOverview.banner.title')" />
    <div :style="{'padding-top': $store.state.app.filter!=='fixed' ? '10px' : '94px'}" class="main-content">
      <iw-filter
        :id="$store.state.app.filter!=='fixed'?'overview-analyse':''"
        :show="{ dataTimeType: true, dataSource: true, dataType: true }"
        :multiple="{ manfBrand: true }"
        @change="handleFilterChange"
      />
      <iw-filter-radio v-if="false" @change="handleFilterRadioChange" />
      <a-card>
        <div slot="title">
          <span>{{ $t('manfbrandOverview.overview.title') }}</span>
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
                <p>① 关于MSRP: 新能源车采用官方补贴后售价; 汽油车采用官方指导价;</p>
                <p>② 关于利润:<br>
                  新能源车利润 = TP - (官方补贴后售价 - (固定折扣 + 考核奖励 + 月度激励))<br>
                  汽油车利润 = TP - (官方指导价 - (固定折扣 + 考核奖励 + 月度激励))</p>
                <p>③ 整体市场/细分市场激励定期在每月18号及最后一天更新（2次）,每月17号<br>
                  之前显示为空或“-”;当月利润更新在每月的最后一天</p>
                <p>④ “*”指当年年度激励暂无，延续历史年度激励</p>
              </div>
            </iw-popover>
          </span>
        </div>
        <div slot="extra">
          <iw-submodel
            v-model="manfbrand"
            :data="manfbrandOptions"
            :default-value="defaultManfbrand"
            :loading="manfBrandOptionsLoading"
            :title="$t('manfbrandOverview.overview.addManfbrandTitle')"
            :min="1"
            show-search
            show-selected
            show-check-all
            is-modal
            multiple
            size="mini"
            placement="bottomLeft"
            style="width: 120px; float: right; padding-right: 20px;"
            @change="handleManfbrandChange"
          >
            <iw-button slot="reference" type="primary" size="mini" style="float: right;">
              {{ $t('manfbrandOverview.overview.addManfbrand') }}
            </iw-button>
          </iw-submodel>
        </div>
        <a-spin :spinning="listLoading">
          <draggable
            v-if="overviewData.length"
            v-model="overviewData"
            filter=".add-brand-item"
            element="ul"
            style="width: 100%"
            class="overview-list clearfix"
            @end="handleDragEnd">
            <template v-for="(item, key) in overviewData">
              <iw-brand-item
                v-if="overviewPageIds.includes(item.id)"
                :key="key"
                :item="item"
                class="overview-list-item"
                @toTop="handleToTopItem"
                @remove="handleRemoveBrandItem" />
            </template>
          </draggable>
          <iw-empty v-else :status="listStatus" style="height: 260px;" />
          <div v-if="overviewData.length > pageSize" style="text-align: center;">
            <a-pagination
              :current="currentPage"
              :total="totalPageSize"
              :show-quick-jumper="false"
              :show-size-changer="false"
              :page-size="pageSize"
              :page-size-options="['10', '20', '30', '40', '50']"
              :default-current="1"
              :show-total="(total, range) => ``"
              @change="handlePageChage"
            />
          </div>
        </a-spin>
      </a-card>
      <a-card :title="$t('manfbrandOverview.table.title')" :body-style="{padding: '0 0 20px 0'}">
        <span slot="extra" class="extra-header-download">
          <iw-download
            type="simple"
            download-api="/market-overview-export/manf-rank"
            :download-params="{
            }"
          />
        </span>
        <a-spin :spinning="tableData.loading">
          <iw-table
            v-if="tableData.data.length>0"
            :data="tableData.data"
            style="width: 100%;margin-bottom: 20px;border-top: 1px solid #eee;"
            row-key="key"
            header-cell-class-name="iw-table-header"
            cell-class-name="iw-table-cell">
            <iw-table-column
              label="添加关注">
              <template slot-scope="scope">
                <a-icon
                  :two-tone-color="manfBrandIds.includes(scope.row.id)?'#eb2f96':''"
                  theme="twoTone"
                  type="star"
                  class="attension-star"
                  @click="handleStarChange(scope.row.id)" />
              </template>
            </iw-table-column>
            <iw-table-column
              prop="name"
              label="生产商品牌"
              :render-header="renderHeader" />
            <iw-table-column
              prop="totalExcitationValue"
              label="总激励/环比">
              <template slot-scope="scope">
                {{ scope.row.totalExcitationValue + '%' }}/<span :class="getClass(scope.row.totalMoMValue)">{{ scope.row.totalMoMValue | toPercent(1, true, '%', 1) }}</span>
              </template>
            </iw-table-column>
            <iw-table-column
              prop="yearDiscount"
              label="年度固定折扣">
              <template slot-scope="scope">
                {{ scope.row.yearDiscount + '%' }}
              </template>
            </iw-table-column>
            <iw-table-column
              prop="yearKPI"
              label="年度考核奖励">
              <template slot-scope="scope">
                {{ scope.row.yearDiscount + '%' }}
              </template>
            </iw-table-column>
            <iw-table-column
              prop="monthExcitation"
              label="月度激励/环比">
              <template slot-scope="scope">
                {{ scope.row.monthExcitation + '%' }}/<span :class="getClass(scope.row.monthMoMValue)">{{ scope.row.monthMoMValue | toPercent(1, true, '%', 1) }}</span>
              </template>
            </iw-table-column>
            <iw-table-column
              prop="profit"
              label="利润/环比">
              <template slot-scope="scope">
                {{ scope.row.profit }}/<span :class="getClass(scope.row.profitMoMValue)">{{ scope.row.profitMoMValue | toPercent(1, true, '%', 1) }}</span>
              </template>
            </iw-table-column>
            <iw-table-column
              prop="sales"
              label="销量/同比"
              :render-header="renderHeader">
              <template slot-scope="scope">
                {{ scope.row.sales }}/<span :class="getClass(scope.row.salesYoYValue)">{{ scope.row.salesYoYValue }}</span>
              </template>
            </iw-table-column>
          </iw-table>
          <iw-empty v-else :status="tableData.status" style="height: 260px;" />
          <div v-if="tableData.data.length > pageSize" style="text-align: center;">
            <a-pagination
              :current="tableData.page"
              :total="tableData.total"
              :show-quick-jumper="true"
              :show-size-changer="true"
              :page-size="tableData.pageSize"
              :page-size-options="['10', '20', '30', '40', '50']"
              :default-current="1"
              :show-total="(total, range) => ``"
              @showSizeChange="handleTablePageSizeChage"
              @change="handleTablePageChage"
            />
          </div>
        </a-spin>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card, Spin, Icon, Pagination } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwFilter from '@/components/filter/index'
import IwFilterRadio from '@/components/filter/radio'
import IwBrandItem from './brand-item.vue'
import IwDownload from '@/components/download/index'
import draggable from 'vuedraggable'
import _ from 'lodash'
import moment from 'moment'
import { getManfBrandData, getTerminalAnalyzeData, getTerminalAnalyzeTableData, saveOrder } from '@/api/manfbrand-overview'
export default {
  components: {
    ACard: Card,
    ASpin: Spin,
    AIcon: Icon,
    APagination: Pagination,
    IwBanner,
    IwFilter,
    IwFilterRadio,
    IwBrandItem,
    IwDownload,
    draggable
  },
  data() {
    return {
      dataForm: {
      },
      overviewData: [],
      manfbrand: [], // 如: 8格式
      manfBrandIds: [], // 如: 7-7格式
      // 卡片
      currentPage: 1,
      totalPageSize: 0,
      pageSize: document.body.clientWidth > 1499 ? 12 : 8,
      listLoading: false,
      listStatus: 200,
      manfBrandOptionsLoading: false,
      defaultManfbrand: [],
      manfbrandOptions: [],
      // 表格
      tableData: {
        data: [],
        page: 1,
        pageSize: 10,
        total: 0,
        status: 0,
        loading: false
      }
    }
  },
  created() {
    window.addEventListener('resize', _.debounce(() => {
      if (document.body.clientWidth > 1499) {
        this.currentPage = 1
        this.pageSize = 12
      } else {
        this.currentPage = 1
        this.pageSize = 8
      }
    }, 100))
    this.getData()
  },
  methods: {
    handleFilterChange(form) {
      this.dataForm = { ...this.dataForm, ...form }
      console.log(this.dataForm)
    },
    handleFilterRadioChange(form) {
      this.dataForm = { ...this.dataForm, ...form }
      console.log(this.dataForm)
    },

    // 卡片
    handleDragEnd() {
      const hasChange = this.overviewData.find((item, key) => {
        return item.id !== this.manfbrand[key]
      })
      if (hasChange) {
        this.manfbrand = this.overviewData.map(item => item.id)
        this.saveOrder()
      }
    },
    handleToTopItem(item) {
      const index = _.indexOf(this.manfbrand, item.id)
      const top = this.manfbrand.splice(index, 1)
      this.manfbrand = [
        ...top,
        ...this.manfbrand
      ]
      const callback = () => {
        const topItem = this.overviewData.splice(index, 1)
        this.overviewData = [
          ...topItem,
          ...this.overviewData
        ]
        this.getOverviewPageIds()
      }
      this.saveOrder().then(callback)
      this.currentPage = 1
    },
    handleRemoveBrandItem(item) {
      const index = this.manfbrand.findIndex(id => id === item.id)
      this.manfbrand.splice(index, 1)
      const callback = () => {
        this.overviewData.splice(index, 1)
        this.getOverviewPageIds()
      }
      this.saveOrder.then(callback)
    },
    getData() {
      this.getManfBrand()
      this.getCardData()
      this.getTableData()
    },
    handlePageChage(page) {
      this.currentPage = page
      this.getOverviewPageIds()
    },
    getCardData() {
      getTerminalAnalyzeData({
      }).then(res => {
        this.overviewData = res.data || []
        this.manfbrand = [this.overviewData.map(item => Number(item.id))]
        this.totalPageSize = this.overviewData.length
        this.manfbrand = this.overviewData.map(item => item.id)
        this.manfBrandIds = this.overviewData.map(item => item.manfBrandId)
        this.getOverviewPageIds()
      }).catch(res => {
      })
    },
    getOverviewPageIds() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize > this.overviewData.length ? this.overviewData.length : startIndex + this.pageSize
      const overviewPageData = this.overviewData.slice(startIndex, endIndex)
      this.overviewPageIds = overviewPageData.map(item => item.id)
      console.log(this.overviewPageIds)
    },
    getManfBrand() {
      getManfBrandData({
      })
        .then(res => {
          const data = res.data
          this.manfbrandOptions = data
          this.manfBrandOptionsLoading = false
        })
        .catch(err => {
          this.manfBrandOptionsLoading = false
          throw err
        })
    },
    handleManfbrandChange(value, texts) {
      this.manfbrand = value
      this.currentPage = 1
      this.saveOrder().then(res => {
        this.getCardData()
      })
    },
    saveOrder() {
      this.listLoading = true
      return new Promise((resolve, reject) => {
        saveOrder({
          ids: this.manfbrand.join(',')
        })
          .then(res => {
            this.listLoading = false
            resolve(res)
          })
          .catch(res => {
            this.listLoading = false
            reject(res)
          })
      })
    },

    // 表格
    renderHeader(h, { column, _self }) {
      if (column.property === 'name') {
        return moment(this.dataForm.ym, 'YYYYMM').format('YYYY年MM月')
      }
      if (column.property === 'sales') {
        return (_self.tableData && _self.tableData[0] ? _self.tableData[0].salesMonth : '') + '销量/同比'
      }
    },
    handleStarChange(value) {
      this.saveOrder().then(res => {
        this.getCardData()
      })
    },
    getClass(item) {
      if (item === '' || item === '-' || item === '0' || item === '0.0%') return 'font-black'
      return item.indexOf('-') === 0 ? 'font-red' : 'font-green'
    },
    handleTablePageChage(page) {
      this.tableData.page = page
      this.getTableData()
    },
    handleTablePageSizeChage(current, pageSize) {
      this.tableData.pageSize = pageSize
      this.tableData.page = 1
      this.getTableData()
    },
    getTableData() {
      this.tableData.loading = true
      getTerminalAnalyzeTableData({
        page: this.tableData.page,
        rows: this.tableData.pageSize
      })
        .then(res => {
          const data = res.data[0] || {}
          this.tableData.data = data.list || []
          this.tableData.total = data.total || []
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
.manfbrand-overview {
  .overview-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .attension-star {
    cursor: pointer;
    font-size: 18px;
  }
}
</style>
