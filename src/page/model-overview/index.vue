<template>
  <div class="model-overview">
    <iw-banner :title="$t('modelOverview.banner.title')" />
    <div :style="{'padding-top': $store.state.app.filter!=='fixed' ? '10px' : '94px'}" class="main-content">
      <iw-filter
        :id="$store.state.app.filter!=='fixed'?'overview-analyse':''"
        :show="{ dataTimeType: true, dataSource: true, manfBrand: true, dataType: true }"
        :multiple="{ manfBrand: true }"
        @change="handleFilterChange"
      />
      <a-card ref="cardContainer" :body-style="{padding: '15px 20px'}">
        <div slot="title">
          <span>{{ $t('modelOverview.overview_2.title') }}</span>
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
        <a-spin :spinning="card_2.loading">
          <ul
            v-if="card_2.data&&card_2.data.length"
            style="width: 100%"
            class="overview-list clearfix">
            <template v-for="(item, key) in card_2.data">
              <IwModelItem
                v-if="card_2.currentPageIds.includes(item.id)"
                :key="key"
                :item="item"
                class="overview-list-item"
                @toTop="value => handleToTopItem(value, __mySubOrMyAttention_2)"
                @remove="value => handleRemoveItem(value, __mySubOrMyAttention_2)" />
            </template>
          </ul>
          <iw-empty v-else :status="card_2.status" style="height: 260px;" />
          <div v-if="card_2.data.length > card_2.pageSize" style="text-align: center;">
            <a-pagination
              :current="card_2.page"
              :total="card_2.total"
              :show-quick-jumper="false"
              :show-size-changer="false"
              :page-size="card_2.pageSize"
              :page-size-options="['10', '20', '30', '40', '50']"
              :default-current="1"
              :show-total="(total, range) => ``"
              @change="page => handlePageChage(page, '2')"
            />
          </div>
        </a-spin>
      </a-card>
      <a-card :body-style="{padding: '15px 20px'}">
        <div slot="title">
          <span>{{ $t('modelOverview.overview.title') }}</span>
        </div>
        <div slot="extra">
          <iw-submodel
            v-model="subModelValue_3"
            :data="subModelOptions"
            :default-value="defaultSubModelValue"
            :loading="subModelOptionsLoading"
            :title="$t('modelOverview.overview.addManfbrandTitle')"
            :filters="subModelFilter"
            :selected-filter="selectedFilter"
            :option-props="{ value: 'value', label: 'text', children: 'children' }"
            :show-letter="showLetter"
            :min="1"
            show-search
            show-selected
            show-check-all
            is-modal
            multiple
            size="mini"
            placement="bottomLeft"
            style="width: 120px; float: right; padding-right: 20px;"
            @filterChange="handleSubModelFilterChange"
            @change="handleSubModelChange"
          >
            <iw-button slot="reference" type="primary" size="mini" style="float: right;">
              {{ $t('modelOverview.overview.addManfbrand') }}
            </iw-button>
          </iw-submodel>
        </div>
        <a-spin :spinning="card_3.loading">
          <ul
            v-if="card_3.data&&card_3.data.length"
            style="width: 100%"
            class="overview-list clearfix">
            <template v-for="(item, key) in card_3.data">
              <IwModelItem
                v-if="card_3.currentPageIds.includes(item.id)"
                :key="key"
                :item="item"
                class="overview-list-item"
                @toTop="handleToTopItem"
                @remove="handleRemoveItem" />
            </template>
          </ul>
          <iw-empty v-else :status="card_3.status" style="height: 260px;" />
          <div v-if="card_3.data.length > card_3.pageSize" style="text-align: center;">
            <a-pagination
              :current="card_3.page"
              :total="card_3.total"
              :show-quick-jumper="false"
              :show-size-changer="false"
              :page-size="card_3.pageSize"
              :page-size-options="['10', '20', '30', '40', '50']"
              :default-current="1"
              :show-total="(total, range) => ``"
              @change="page => handlePageChage(page, '3')"
            />
          </div>
        </a-spin>
      </a-card>
      <a-card :title="$t('modelOverview.table.title')" :body-style="{padding: '0 0 20px 0'}">
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
                <iw-popover
                  v-if="subModelValue_3.includes(scope.row.id)"
                  v-model="scope.row.visible"
                  :offset="{left: -10}"
                  :width="null"
                  :body-style="{padding: '10px'}"
                  popper-class="iw-popover-attension"
                  placement="top"
                  show-arrow>
                  <a-icon
                    v-if="scope.$index!==0"
                    slot="reference"
                    two-tone-color="#FBAD57"
                    theme="twoTone"
                    type="star"
                    class="attension-star"
                    style="width: 40px;" />
                  <div>
                    <div class="message">
                      是否取消关注车型？
                    </div>
                    <div class="buttons">
                      <iw-button size="mini" type="primary" @click="handleRemoveItem(scope.row, '3')">
                        确定
                      </iw-button>
                      <iw-button size="mini" @click="scope.row.visible=false">
                        取消
                      </iw-button>
                    </div>
                  </div>
                </iw-popover>
                <a-icon
                  v-else-if="scope.$index!==0"
                  two-tone-color="#bebebe"
                  theme="twoTone"
                  type="star"
                  class="attension-star"
                  @click="handleStarChange(scope.row, subModelValue_3.includes(scope.row.id))" />
              </template>
            </iw-table-column>
            <iw-table-column
              prop="name"
              width="120"
              label="车型">
              <template slot-scope="scope">
                <div v-if="scope.$index===0">
                  <iw-select
                    v-model="segmentId"
                    :data="segmentOptions"
                    :option-props="{
                      value: 'value',
                      label:'text'
                    }"
                    size="mini"
                    @change="handleSegmentChange" />
                </div>
                <div v-else>
                  {{ scope.row.name }}
                </div>
              </template>
            </iw-table-column>
            <iw-table-column
              prop="totalExcitationValue"
              label="总激励/环比">
              <template slot-scope="scope">
                {{ scope.row.totalExcitationValue | toPercent(1, false, '%', 1) }}/<span :class="getClass(scope.row.totalMoMValue)">{{ scope.row.totalMoMValue | toPercent(1, true, '%', 1) }}</span>
              </template>
            </iw-table-column>
            <iw-table-column
              prop="yearDiscount"
              label="年度固定折扣">
              <template slot-scope="scope">
                {{ scope.row.yearDiscount | toPercent(1, false, '%', 1) }}
              </template>
            </iw-table-column>
            <iw-table-column
              prop="yearKPI"
              label="年度考核奖励">
              <template slot-scope="scope">
                {{ scope.row.yearDiscount | toPercent(1, false, '%', 1) }}
              </template>
            </iw-table-column>
            <iw-table-column
              prop="monthExcitation"
              label="月度激励/环比">
              <template slot-scope="scope">
                {{ scope.row.monthExcitation | toPercent(1, false, '%', 1) }}/<span :class="getClass(scope.row.monthMoMValue)">{{ scope.row.monthMoMValue | toPercent(1, true, '%', 1) }}</span>
              </template>
            </iw-table-column>
            <iw-table-column
              prop="msrp"
              label="加权MSRP"
              :render-header="renderHeader">
              <template slot-scope="scope">
                {{ scope.row.msrp | toThousand }}
              </template>
            </iw-table-column>
            <iw-table-column
              prop="tp"
              label="加权TP"
              :render-header="renderHeader">
              <template slot-scope="scope">
                {{ scope.row.tp | toThousand }}
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
              prop="discount"
              label="折扣/环比">
              <template slot-scope="scope">
                {{ scope.row.discount | toPercent(1, false, '%', 1) }}/<span :class="getClass(scope.row.discountMoMValue)">{{ scope.row.discountMoMValue | toPercent(1, true, '%', 1) }}</span>
              </template>
            </iw-table-column>
            <iw-table-column
              prop="sales"
              label="销量/同比"
              :render-header="renderHeader">
              <template slot-scope="scope">
                {{ scope.row.sales | toThousand }}/<span :class="getClass(scope.row.salesYoYValue)">{{ scope.row.salesYoYValue }}</span>
              </template>
            </iw-table-column>
          </iw-table>
          <iw-empty v-else :status="tableData.status" style="height: 260px;" />
          <div v-if="tableData.data.length > tableData.pageSize" style="text-align: center;">
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
import { Card, Spin, Icon, Pagination, message } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwFilter from '@/components/filter/index'
import IwModelItem from './model-item.vue'
import IwDownload from '@/components/download/index'
import _ from 'lodash'
import moment from 'moment'
import { getSegmentData, getSubModelData, getTerminalAnalyzeData, getTerminalAnalyzeTableData, saveOrder } from '@/api/model-overview'
const __mySubOrMyAttention_2 = '2'
const __mySubOrMyAttention_3 = '3'

export default {
  components: {
    ACard: Card,
    ASpin: Spin,
    AIcon: Icon,
    APagination: Pagination,
    IwBanner,
    IwFilter,
    IwModelItem,
    IwDownload
  },
  data() {
    return {
      dataForm: {
      },
      showLetter: false,
      subModelValue_3: [],
      subModelOptionsLoading: false,
      defaultSubModelValue: [],
      subModelOptions: [],
      subModelFilter: [
        { value: '0', text: '细分市场' },
        { value: '1', text: '厂商品牌' }
      ],
      selectedFilter: 0,
      subModelData: {},

      segmentId: '',
      segmentOptions: [],

      // 卡片
      card_2: {
        data: [],
        page: 1,
        total: 0,
        pageSize: 10,
        currentPageIds: [],
        loading: false,
        status: 0
      },
      card_3: {
        data: [],
        page: 1,
        total: 0,
        pageSize: document.body.clientWidth >= 1563 ? 12 : (document.body.clientWidth >= 1302 ? 10 : 8),
        currentPageIds: [],
        loading: false,
        status: 0
      },
      // 表格
      tableData: {
        data: [],
        page: 1,
        pageSize: document.body.clientWidth >= 1563 ? 12 : (document.body.clientWidth >= 1302 ? 10 : 8),
        total: 0,
        status: 0,
        loading: false
      }
    }
  },
  computed: {
    sidebar() {
      return this.$store.getters.sidebar.opened
    }
  },
  watch: {
    sidebar() {
      this.init()
    },
    dataForm: {
      handler() {
        if (this.dataForm.ym) {
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
    if (this.dataForm.ym) {
      this.getData()
    }
  },
  methods: {
    init() {
      const width = this.$refs['cardContainer'] && this.$refs['cardContainer'].$el
        ? this.$refs['cardContainer'].$el.offsetWidth
        : document.body.clientWidth
      console.log('width', width)
      if (width >= 1542) {
        this['card_2'].page = this['card_3'].page = 1
        this['card_2'].pageSize = this['card_3'].pageSize = 12
      } else if (width >= 1302) {
        this['card_2'].page = this['card_3'].page = 1
        this['card_2'].pageSize = this['card_3'].pageSize = 10
      } else {
        this['card_2'].page = this['card_3'].page = 1
        this['card_2'].pageSize = this['card_3'].pageSize = 8
      }
      if (this.dataForm.ym) {
        this.getOverviewPageIds(__mySubOrMyAttention_2)
        this.getOverviewPageIds(__mySubOrMyAttention_3)
      }
    },
    handleFilterChange(form) {
      console.log('form', form)
      this.dataForm = { ...this.dataForm, ...form }
    },
    handleSubModelFilterChange(value) {
      this.showLetter = value === '1'
      this.selectedFilter = value
      this.subModelOptions = this.subModelData[value]
    },
    handleToTopItem(item, type = __mySubOrMyAttention_3) {
      const index = _.indexOf(this['subModelValue_' + type], item.id)
      const top = this['subModelValue_' + type].splice(index, 1)
      this['subModelValue_' + type] = [
        ...top,
        ...this['subModelValue_' + type]
      ]
      const callback = () => {
        const topItem = this['card_' + type].data.splice(index, 1)
        this['card_' + type].data = [
          ...topItem,
          ...this['card_' + type].data
        ]
      }
      this.saveOrder().then(callback)
      this['card_' + type].page = 1
    },
    handleRemoveItem(item, type = __mySubOrMyAttention_3) {
      const index = this['subModelValue_' + type].findIndex(id => id === item.id)
      this['subModelValue_' + type].splice(index, 1)
      const callback = () => {
        this['card_' + type].data.splice(index, 1)
        message.info('取消关注成功')
      }
      this.saveOrder().then(callback)
    },
    handleSubModelChange() {},
    // API
    async getData() {
      this.getSubModelData()
      await this.getSegmentData()
      this.getCardData({ mySubOrMyAttention: '2' })
      this.getCardData({ mySubOrMyAttention: '3' })
      this.getTableData()
    },
    handlePageChage(page, type = __mySubOrMyAttention_3) {
      this['card_' + type].page = page
      this.getOverviewPageIds(type)
    },
    getCardData(params = {}) {
      if (![__mySubOrMyAttention_2, __mySubOrMyAttention_3].includes(params.mySubOrMyAttention)) {
        message.error('params error')
        return
      }
      return new Promise((resolve, reject) => {
        getTerminalAnalyzeData({
          ym: this.dataForm.ym,
          maxYm: this.dataForm.maxYm,
          dataSource: this.dataForm.dataSource,
          moneyOrRatio: this.dataForm.dataType,
          isQuarter: this.dataForm.dataTimeType,
          mySubOrMyAttention: 3,
          ...params
        }).then(res => {
          this['card_' + params.mySubOrMyAttention].data = res.data || []
          this['card_' + params.mySubOrMyAttention].total = (res.data || []).length
          this['subModelValue_' + params.mySubOrMyAttention] = this['card_' + params.mySubOrMyAttention].data.map(item => item.id)
          this.getOverviewPageIds(params.mySubOrMyAttention)
          resolve(res)
        }).catch(res => {
          reject(res)
        })
      })
    },
    getOverviewPageIds(type = __mySubOrMyAttention_3) {
      const startIndex = (this['card_' + type].page - 1) * this['card_' + type].pageSize
      const endIndex = startIndex + this['card_' + type].pageSize > this['card_' + type].data.length ? this['card_' + type].data.length : startIndex + this['card_' + type].pageSize
      const data = this['card_' + type].data.slice(startIndex, endIndex)
      this['card_' + type].currentPageIds = data.map(item => item.id)
    },
    getSegmentData() {
      return new Promise((resolve, reject) => {
        getSegmentData()
          .then(res => {
            const data = res.data || {}
            this.segmentOptions = data || []
            const segment = data[0] || {}
            this.segmentId = segment.value
            this.segmentName = segment.text
            resolve(data)
          })
          .catch(res => {
            reject(res)
          })
      })
    },
    getSubModelData() {
      this.subModelOptionsLoading = true
      getSubModelData()
        .then(res => {
          const data = res.data || {}
          this.subModelData = data || []
          this.selectedFilter = 0
          this.subModelOptions = this.subModelData[this.selectedFilter] // 细分市场分组
          this.subModelOptionsLoading = false
        })
    },
    saveOrder(type = __mySubOrMyAttention_3) {
      this['card_' + type].loading = true
      return new Promise((resolve, reject) => {
        saveOrder({
          ids: this['subModelValue_' + type].join(',')
        })
          .then(res => {
            this['card_' + type].loading = false
            resolve(res)
          })
          .catch(res => {
            this['card_' + type].loading = false
            reject(res)
          })
      })
    },
    // 表格
    renderHeader(h, { column, _self }) {
      if (column.property === 'msrp') {
        return column.label + '(' + moment(this.dataForm.ym, 'YYYYMM').format('M月') + ')'
      }
      if (column.property === 'tp') {
        return column.label + '(' + moment(this.dataForm.ym, 'YYYYMM').format('M月') + ')'
      }
      if (column.property === 'sales') {
        return column.label + '(' + (_self.tableData.data && _self.tableData.data[0] ? _self.tableData.data[0].salesMonth : '') + ')'
      }
    },
    handleStarChange(item, checked = false, type = __mySubOrMyAttention_3) {
      this.getCardData({ ids: item.id, mySubOrMyAttention: '3' }).then(res => {
        message.info('添加关注成功')
        // testing...
        this['card_' + type].data = [res.data[0], ...this['card_' + type].data]
        this['subModelValue_' + type] = [item.id, ...this['subModelValue_' + type]]
        this.saveOrder()
      })
    },
    getClass(item) {
      if (item === '' || item === '-' || item === '0' || item === '0.0%') return 'font-black'
      return item.indexOf('-') === 0 ? 'font-red' : 'font-green'
    },
    handleSegmentChange(value, texts) {
      this.segmentName = this.segmentOptions.find(item => item.value === value).text
      this.getTableData()
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
        ym: this.dataForm.ym,
        maxYm: this.dataForm.maxYm,
        dataSource: this.dataForm.dataSource,
        moneyOrRatio: this.dataForm.dataType,
        isQuarter: this.dataForm.dataTimeType,
        dataType: 'sub',
        segSubIds: this.segmentId,
        segName: this.segmentName,
        page: this.tableData.page,
        rows: this.tableData.pageSize
      })
        .then(res => {
          const data = res.data[0] || {}
          this.tableData.data = [data.totalModel, ...data.models.list.map(item => {
            item.visible = false
            return item
          })]
          this.tableData.total = 100
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

<style lang="less">
.iw-popover-attension {
  font-size: 12px;
  .message {
    position: relative;
    padding: 4px 0 12px;
    color: rgba(0,0,0,.65);
    font-size: 14px;
  }
  .buttons {
    margin-bottom: 4px;
    text-align: right;
  }
}
</style>
<style lang="less" scoped>
.model-overview {
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
  .iw-table {
    font-size: 14px;
  }
}
</style>
