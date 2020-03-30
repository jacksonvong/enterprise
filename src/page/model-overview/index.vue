<template>
  <div class="model-overview">
    <iw-banner :title="$t('modelOverview.banner.title')" />
    <div :style="{'padding-top': $store.state.app.filter!=='fixed' ? '10px' : '94px'}" class="main-content">
      <iw-filter
        :id="$store.state.app.filter!=='fixed'?'overview-analyse':''"
        :show="{ dataTimeType: true, dataSource: true, manfBrand: true, dataType: true }"
        :multiple="{ manfBrand: true }"
        @change="changeDataForm"
      /><a-card>
        <div slot="title">
          <span>{{ $t('modelOverview.overview.title') }}</span>
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
            v-model="subModelValue"
            :data="subModelOptions"
            :default-value="defaultSubModelValue"
            :loading="subModelOptionsLoading"
            :title="$t('modelOverview.overview.addManfbrandTitle')"
            :filters="subModelFilter"
            :selected-filter="selectedFilter"
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
            @filterChange="handleFilterChnage"
            @change="handleSubModelChange"
          >
            <iw-button slot="reference" type="primary" size="mini" style="float: right;">
              {{ $t('modelOverview.overview.addManfbrand') }}
            </iw-button>
          </iw-submodel>
        </div>
        <a-spin :spinning="card.loading">
          <draggable
            v-if="overviewData.length"
            v-model="overviewData"
            filter=".add-brand-item"
            element="ul"
            style="width: 100%"
            class="overview-list clearfix"
            @end="handleDragEnd">
            <template v-for="(item, key) in overviewData">
              <IwModelItem
                v-if="overviewPageIds.includes(item.id)"
                :key="key"
                :item="item"
                class="overview-list-item"
                @toTop="handleToTopItem"
                @remove="handleRemoveBrandItem" />
            </template>
          </draggable>
          <iw-empty v-else :status="card.status" style="height: 260px;" />
          <div v-if="card.data.length > card.pageSize" style="text-align: center;">
            <a-pagination
              :current="card.page"
              :total="card.total"
              :show-quick-jumper="false"
              :show-size-changer="false"
              :page-size="card.pageSize"
              :page-size-options="['10', '20', '30', '40', '50']"
              :default-current="1"
              :show-total="(total, range) => ``"
              @change="handlePageChage"
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
                <a-icon
                  :two-tone-color="subModelIds.includes(scope.row.id)?'#eb2f96':''"
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
import { Card, Spin, Icon, Pagination } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwFilter from '@/components/filter/index'
import IwModelItem from './model-item.vue'
import IwDownload from '@/components/download/index'
import draggable from 'vuedraggable'
import _ from 'lodash'
// import moment from 'moment'
import { getSegmentData, getSubModelData, getTerminalAnalyzeData, getTerminalAnalyzeTableData, saveOrder } from '@/api/model-overview'
export default {
  components: {
    ACard: Card,
    ASpin: Spin,
    AIcon: Icon,
    APagination: Pagination,
    IwBanner,
    IwFilter,
    IwModelItem,
    IwDownload,
    draggable
  },
  data() {
    return {
      dataForm: {
      },
      overviewData: [],
      showLetter: false,
      subModelValue: [], // 如: 8格式
      subModelIds: [], // 如: 7-7格式
      subModelOptionsLoading: false,
      defaultSubModelValue: [],
      subModelOptions: [],
      subModelFilter: [],
      selectedFilter: 0,
      subModelData: {},

      overviewPageIds: [],
      // 卡片
      card: {
        data: [],
        page: 1,
        total: 0,
        pageSize: document.body.clientWidth > 1499 ? 12 : 8,
        loading: false,
        status: 0
      },
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
    changeDataForm(form) {
      console.log(form)
      this.filterForm = { ...this.filterForm, ...form }
    },
    handleFilterChnage(value) {
      if (value === 1) {
        this.showLetter = false
      } else {
        this.showLetter = true
      }
      this.selectedFilter = value
      this.subModelOptions = this.subModelData[value]
    },
    handleSubModelChange() {},
    // API
    getData() {
      this.getSubModelData()
    },
    getSegmentData() {
      getSegmentData()
    },
    getSubModelData() {
      getSubModelData()
        .then(res => {
          const data = res.data || {}
          this.subModelData = data.data || []
          this.subModelFilter = data.title.map((item, key) => { return { key: key, value: item } })
          this.selectedFilter = 1
          this.subModelOptions = this.subModelData[this.selectedFilter] // 细分市场分组
          console.log(this.subModelOptions)
        })
    },
    getTerminalAnalyzeData() {
      getTerminalAnalyzeData()
    },
    getTerminalAnalyzeTableData() {
      getTerminalAnalyzeTableData()
    },
    saveOrder() {
      saveOrder()
    }
  }
}
</script>

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
}
</style>
