<template>
  <a-card :title="`${$t('modelOverview.overview.title')}-${manfbrand.value || ''}`">
    <div slot="extra">
      <iw-submodel
        v-model="submodel"
        :data="submodelData"
        :default-value="defaultSubmodel"
        :show-search="true"
        :show-selected="true"
        :show-letter="showLetter"
        :filters="[{key: 1, value: $t('modelOverview.overview.filter1name')}, {key: 2, value: $t('modelOverview.overview.filter2name')}]"
        :selected-filter="selectedFilter"
        :show-check-all="true"
        :leafs-per-column="6"
        :is-modal="true"
        :loading="submodelOptionsLoading"
        :title="$t('modelOverview.overview.addSubmodelTitle')"
        :min="1"
        size="mini"
        placement="bottomLeft"
        style="width: 120px; float: right;"
        @filterChange="handleFilterChange"
        @change="handleSubmodelChange"
      >
        <iw-button slot="reference" type="primary" size="mini" style="float: right;">
          {{ $t('modelOverview.overview.addSubmodel') }}
        </iw-button>
      </iw-submodel>
    </div>
    <a-spin :spinning="listLoading || commonParamsLoading">
      <ul v-if="pageListData.length" class="overview-list clearfix">
        <li
          v-for="(item, index) in pageListData"
          :key="`${item.subModel.id}+${index}`"
          :class="{en: language === 'en'}"
          class="overview-list-item"
          @click="handleGotoAnalyse(item.subModel)"
        >
          <a-popover placement="rightTop">
            <template slot="content">
              <div class="popover-text" style="padding: 8px; color: #969ba7;" v-html="getBulbText(item.colorVal)" />
            </template>
            <img v-if="item.colorVal === 1" class="bulb-icon" src="~@/assets/images/icon/bulb-red.png">
            <img v-if="item.colorVal === 2" class="bulb-icon" src="~@/assets/images/icon/bulb-green.png">
            <img v-if="item.colorVal === 3" class="bulb-icon" src="~@/assets/images/icon/bulb-yellow.png">
          </a-popover>

          <img class="close-icon" src="~@/assets/images/icon/close.png" @click.stop="handleRemoveSubmodel(item.subModel.id)">
          <div><img :src="item.subModel.picPath" :alt="item.subModel.name" class="logo"></div>
          <div :title="item.subModel.name" class="title">
            <span>
              {{ item.subModel.name }}
              <img :title="$t('modelOverview.overview.card.setTop')" class="settop-icon" src="~@/assets/images/icon/top.png" @click.stop="handleSetTop(item.subModel.id)">
            </span>
          </div>
          <div class="sub-title">
            {{ item.lifeCircleDesc && $t('modelOverview.overview.card.subTitle', { type: item.lifeCircleDesc.name, months: item.lifeCircleDesc.id }) }}
          </div>
          <div
            :title="getRowContent('row1title', item.maxNegative ? item.maxNegative : '-')"
            class="content-row"
          >
            <img class="row-icon" src="~@/assets/images/icon/row1icon.png">
            <label v-if="dateType === 1">{{ $t('modelOverview.overview.card.row1title', { month }) }}</label>
            <label v-if="dateType === 2">{{ $t('modelOverview.overview.card.row1title2', { quarter }) }}</label>
            {{ item.maxNegative ? item.maxNegative : '-' }}
          </div>
          <div
            :title="getRowContent('row2title', item.maxCompSubModel ? item.maxCompSubModel.name : '-')"
            class="content-row"
          >
            <img class="row-icon" src="~@/assets/images/icon/row2icon.png">
            <label v-if="dateType === 1">{{ $t('modelOverview.overview.card.row2title', { month }) }}</label>
            <label v-if="dateType === 2">{{ $t('modelOverview.overview.card.row2title2', { quarter }) }}</label>
            {{ item.maxCompSubModel ? item.maxCompSubModel.name : '-' }}
          </div>
          <div
            :title="getRowContent('row3title', `${toThousand(item.volumeIndex, 2)} / ${item.volumeMom > 0 ? '+' : ''}${toPercent(item.volumeMom)}`)"
            class="content-row"
          >
            <img class="row-icon" src="~@/assets/images/icon/row3icon.png">
            <label v-if="dateType === 1">{{ $t('modelOverview.overview.card.row3title', { month }) }}</label>
            <label v-if="dateType === 2">{{ $t('modelOverview.overview.card.row3title2', { quarter }) }}</label>
            <span v-html="formatNumber(item.volumeIndex, 2)" /> / <span v-html="formatPercent(item.volumeMom)" />
          </div>
          <div
            :title="getRowContent('row4title', `${toThousand(item.satisfied, 2)} / ${item.satisfiedMom > 0 ? '+' : ''}${toPercent(item.satisfiedMom)}`)"
            class="content-row"
          >
            <img class="row-icon" src="~@/assets/images/icon/heart.png">
            <label v-if="dateType === 1">{{ $t('modelOverview.overview.card.row4title', { month }) }}</label>
            <label v-if="dateType === 2">{{ $t('modelOverview.overview.card.row4title2', { quarter }) }}</label>
            <span v-html="formatNumber(item.satisfied, 2)" /> / <span v-html="formatPercent(item.satisfiedMom)" />
          </div>
          <div
            :title="getRowContent('row5title', `${toThousand(item.sales)} / ${item.salesYoy > 0 ? '+' : ''}${toPercent(item.salesYoy)}`)"
            class="content-row"
          >
            <img class="row-icon" src="~@/assets/images/icon/row5icon.png">
            <label v-if="dateType === 1">{{ $t('modelOverview.overview.card.row5title', { month }) }}</label>
            <label v-if="dateType === 2">{{ $t('modelOverview.overview.card.row5title2', { quarter }) }}</label>
            <span v-html="formatNumber(item.sales)" /> / <span v-html="formatPercent(item.salesYoy)" />
          </div>
        </li>
      </ul>
      <iw-empty v-else :status="listStatus" style="height: 260px;" />
      <div v-if="listData.length > pageSize" style="text-align: center;">
        <a-pagination
          :current="currentPage"
          :total="totalPageSize"
          :show-quick-jumper="false"
          :show-size-changer="false"
          :page-size="pageSize"
          :page-size-options="['10', '20', '30', '40', '50']"
          :default-current="1"
          :show-total="(total, range) => ``"
          size="small"
          @change="handlePageChage"
        />
      </div>
    </a-spin>
  </a-card>
</template>

<script>
import './card-list.scss'
import { Card, Spin, message, Pagination, Popover } from 'ant-design-vue'
import dateText from '@/mixins/dateText'
import formatter from '@/mixins/formatter'
import loading from '@/mixins/loading'
import _ from 'lodash'
import $ from 'jquery'
import { isEmpty } from '@/utils/helper'
import { toThousand, toPercent } from '@/utils/filters'
import { getAttentionList, saveAttention, getSubmodelOverview } from '@/api/modelOverview'
import { getSubmodel } from '@/api/filter'
import { saveBrowsingHistory } from '@/api/filter'

export default {
  components: {
    'a-card': Card,
    'a-spin': Spin,
    'a-popover': Popover,
    'a-pagination': Pagination
  },
  mixins: [dateText, formatter, loading],
  props: {
    platform: {
      type: String,
      default: ''
    },
    dataSource: {
      type: String,
      default: ''
    },
    manfbrand: {
      type: Object,
      default: function() { return {} }
    }
  },
  data() {
    return {
      currentPage: 1,
      totalPageSize: 0,
      pageSize: document.body.clientWidth > 1499 ? 12 : 8,
      listLoading: false,
      listStatus: 200,
      listData: [],
      submodelOptionsLoading: false,
      submodel: [],
      defaultSubmodel: [],
      submodelData: [],
      segmentSubModel: [],
      brandSubModel: [],
      selectedFilter: 1,
      showLetter: false
    }
  },
  computed: {
    pageListData() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize > this.listData.length ? this.listData.length : startIndex + this.pageSize
      return this.listData.slice(startIndex, endIndex)
    }
  },
  watch: {
    platform() {
      this.init()
    },
    dataSource() {
      this.init()
    },
    dateType() {
      this.init()
    },
    ym() {
      this.init()
    },
    manfbrand() {
      this.init()
    }
  },
  mounted() {
    $(window).resize(_.debounce(() => {
      if (document.body.clientWidth > 1499) {
        this.currentPage = 1
        this.pageSize = 12
      } else {
        this.currentPage = 1
        this.pageSize = 8
      }
    }, 100))
    this.init()
  },
  methods: {
    init: _.debounce(
      function() {
        this.reset()
        this.getDefaultFollow().then(() => { this.getListData() })
        this.getSubmodelOptions()
      },
      100
    ),
    getBulbText(type) {
      switch (type) {
        case 1:
          return this.$t(`modelOverview.overview.card.redBulbText`)
        case 2:
          return this.$t(`modelOverview.overview.card.greenBulbText`)
        case 3:
          return this.$t(`modelOverview.overview.card.yellowBulbText`)
        default:
          return ''
      }
    },
    toThousand(value, fixed = 0) {
      return toThousand(value, fixed)
    },
    toPercent(value, fixed = 1) {
      return toPercent(value, fixed)
    },
    getRowContent(label, joinStr) {
      let content = ''
      if (this.dateType === 1) {
        content += this.$t(`modelOverview.overview.card.${label}`, { month: this.month })
      }
      if (this.dateType === 2) {
        content += this.$t(`modelOverview.overview.card.${label}2`, { quarter: this.quarter })
      }
      return `${content}：${joinStr}`
    },
    handlePageChage(page) { // 分页器当前页变化处理
      this.currentPage = page
    },
    reset() {
      this.currentPage = 1
      this.selectedFilter = 1
      this.showLetter = false
      this.submodel = []
    },
    getDefaultFollow() { // 获取默认关注列表
      return new Promise((resolve, reject) => {
        if (!isEmpty(this.manfbrand.key) && !isEmpty(this.dataSource) && !isEmpty(this.dateType) && !isEmpty(this.ym) && !isEmpty(this.platform)) {
          this.listLoading = true
          getAttentionList({
            'dataSource': this.dataSource,
            'manfBrandId': this.manfbrand.key,
            'mqFlag': this.dateType,
            'mqId': this.ym,
            'platformEnum': this.platform,
            'typeId': 1
          })
            .then(res => {
              const data = res.data
              this.submodel = data
              this.defaultSubmodel = _.cloneDeep(data)
              this.listLoading = false
              resolve()
            })
            .catch(err => {
              this.listLoading = false
              reject(err)
            })
        } else {
          resolve()
        }
      })
    },
    saveFollow() { // 保存关注列表
      return saveAttention({
        'manfBrandId': this.manfbrand.key,
        'subModelIds': this.submodel,
        'typeId': 1
      })
        .then(() => {
          this.defaultSubmodel = _.cloneDeep(this.submodel)
        })
    },
    getListData() { // 获取列表数据
      if (!isEmpty(this.dateType) && !isEmpty(this.dataSource) && !isEmpty(this.ym) && !isEmpty(this.platform) && !isEmpty(this.submodel)) {
        this.listLoading = true
        getSubmodelOverview({
          'dataSource': this.dataSource,
          'mqFlag': this.dateType,
          'mqId': this.ym,
          'platform': this.platform,
          'subModelId': this.submodel
        })
          .then(res => {
            this.listData = res.data
            this.totalPageSize = this.listData.length
            this.listLoading = false
          })
          .catch(err => {
            this.currentPage = 1
            this.totalPageSize = 0
            this.listLoading = false
            throw err
          })
      } else {
        if (isEmpty(this.submodel)) {
          this.listData = []
          this.currentPage = 1
          this.totalPageSize = 0
        }
      }
    },
    getSubmodelOptions() { // 只可选择本品厂商品牌的车型，多选项
      if (!isEmpty(this.dateType) && !isEmpty(this.manfbrand.key) && !isEmpty(this.ym) && !isEmpty(this.platform)) {
        this.submodelOptionsLoading = true
        getSubmodel({
          'flag': true,
          'manfBrandId': this.manfbrand.key,
          'mqFlag': this.dateType,
          'mqId': this.ym,
          'platformEnum': this.platform
        })
          .then(res => {
            const data = res.data
            this.segmentSubModel = data[0]
            this.brandSubModel = data[1]
            this.submodelData = this.segmentSubModel
            this.submodelOptionsLoading = false
          })
          .catch(err => {
            this.submodelOptionsLoading = false
            throw err
          })
      }
    },
    handleFilterChange(value, key) {
      this.selectedFilter = value
      if (value === 1) {
        this.showLetter = false
        this.submodelData = this.segmentSubModel
      } else {
        this.showLetter = true
        this.submodelData = this.brandSubModel
      }
    },
    handleSubmodelChange(value, texts) {
      this.submodel = value
      this.currentPage = 1
      this.getListData()
      this.saveFollow()
    },
    handleSetTop(id) {
      const index = _.indexOf(this.submodel, id)
      const top = this.submodel.splice(index, 1)
      this.submodel = [
        ...top,
        ...this.submodel
      ]
      this.saveFollow()
      this.currentPage = 1
      this.getListData()
    },
    handleRemoveSubmodel(id) {
      if (this.submodel.length === 1) {
        message.error(this.$t('modelOverview.overview.card.removeErr'))
        return
      }
      const index = _.indexOf(this.submodel, id)
      this.submodel.splice(index, 1)
      this.saveFollow().then(() => { message.success(this.$t('modelOverview.overview.card.removeSuccess')) })
      if (this.currentPage > 1 && this.currentPage > Math.ceil(this.submodel.length / this.pageSize)) {
        this.currentPage = 1
      }
      this.getListData()
    },
    handleGotoAnalyse(submodel) {
      saveBrowsingHistory({
        'recordType': 1,
        'refferId': submodel.id
      })
        .then(response => {
          this.$router.push({
            name: 'modelAnalysis',
            params: {
              submodel
            }
          })
        })
    }
  }
}
</script>

<style lang="scss">
</style>
