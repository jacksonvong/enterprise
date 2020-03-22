<template>
  <div class="manfbrand-overview">
    <iw-banner :title="$t('manfbrandOverview.banner.title')" />
    <div :style="{'padding-top': $store.state.app.filter!=='fixed' ? '10px' : '76px'}" class="main-content">
      <iw-filter
        :id="$store.state.app.filter!=='fixed'?'overview-analyse':''"
        :show="{ dataTimeType: true, dataSource: true, dataType: true }"
        :multiple="{ manfBrand: true }"
        @change="handleFilterChange"
      />
      <iw-filter-radio @change="handleFilterRadioChange" />

      <a-card :title="`${$t('manfbrandOverview.overview.title')}`">
        <div slot="extra">
          <iw-manfbrand
            v-if="false"
            v-model="manfbrand"
            :data="manfbrandData"
            :default-value="defaultManfbrand"
            :show-search="true"
            :show-selected="true"
            :show-letter="showLetter"
            :filters="[{key: 1, value: $t('manfbrandOverview.overview.filter1name')}, {key: 2, value: $t('manfbrandOverview.overview.filter2name')}]"
            :selected-filter="selectedFilter"
            :show-check-all="true"
            :leafs-per-column="6"
            :is-modal="true"
            :loading="manfbrandOptionsLoading"
            :title="$t('manfbrandOverview.overview.addManfbrandTitle')"
            :min="1"
            size="mini"
            placement="bottomLeft"
            style="width: 120px; float: right;"
            @filterChange="handleFilterChange"
            @change="handleManfbrandChange"
          >
            <iw-button slot="reference" type="primary" size="mini" style="float: right;">
              {{ $t('manfbrandOverview.overview.addManfbrand') }}
            </iw-button>
          </iw-manfbrand>
        </div>
        <a-spin :spinning="listLoading">
          <ul v-if="pageListData.length" class="overview-list clearfix">
            <li
              v-for="(item, index) in pageListData"
              :key="`${item.subModel.id}+${index}`"
              :class="{en: language === 'en'}"
              class="overview-list-item"
              @click="handleGotoAnalyse(item.subModel)"
            >
              <img class="close-icon" @click.stop="handleRemoveManfbrand(item.subModel.id)">
              <div><img :src="item.subModel.picPath" :alt="item.subModel.name" class="logo"></div>
              <div :title="item.subModel.name" class="title">
                <span>
                  {{ item.subModel.name }}

                </span>
              </div>
              <div class="sub-title">
                {{ item.lifeCircleDesc && $t('manfbrandOverview.overview.card.subTitle', { type: item.lifeCircleDesc.name, months: item.lifeCircleDesc.id }) }}
              </div>
              <div
                :title="getRowContent('row1title', item.maxNegative ? item.maxNegative : '-')"
                class="content-row"
              >
                <a-icon class="row-icon" type="heart" />
                <label v-if="dateType === 1">{{ $t('manfbrandOverview.overview.card.row1title', { month }) }}</label>
                <label v-if="dateType === 2">{{ $t('manfbrandOverview.overview.card.row1title2', { quarter }) }}</label>
                {{ item.maxNegative ? item.maxNegative : '-' }}
              </div>
              <div
                :title="getRowContent('row2title', item.maxCompSubModel ? item.maxCompSubModel.name : '-')"
                class="content-row"
              >
                <a-icon class="row-icon" type="heart" />
                <label v-if="dateType === 1">{{ $t('manfbrandOverview.overview.card.row2title', { month }) }}</label>
                <label v-if="dateType === 2">{{ $t('manfbrandOverview.overview.card.row2title2', { quarter }) }}</label>
                {{ item.maxCompSubModel ? item.maxCompSubModel.name : '-' }}
              </div>
              <div
                :title="getRowContent('row3title', `${toThousand(item.volumeIndex, 2)} / ${item.volumeMom > 0 ? '+' : ''}${toPercent(item.volumeMom)}`)"
                class="content-row"
              >
                <a-icon class="row-icon" type="heart" />
                <label v-if="dateType === 1">{{ $t('manfbrandOverview.overview.card.row3title', { month }) }}</label>
                <label v-if="dateType === 2">{{ $t('manfbrandOverview.overview.card.row3title2', { quarter }) }}</label>
                <span v-html="formatNumber(item.volumeIndex, 2)" /> / <span v-html="formatPercent(item.volumeMom)" />
              </div>
              <div
                :title="getRowContent('row4title', `${toThousand(item.satisfied, 2)} / ${item.satisfiedMom > 0 ? '+' : ''}${toPercent(item.satisfiedMom)}`)"
                class="content-row"
              >
                <a-icon class="row-icon" type="heart" />
                <label v-if="dateType === 1">{{ $t('manfbrandOverview.overview.card.row4title', { month }) }}</label>
                <label v-if="dateType === 2">{{ $t('manfbrandOverview.overview.card.row4title2', { quarter }) }}</label>
                <span v-html="formatNumber(item.satisfied, 2)" /> / <span v-html="formatPercent(item.satisfiedMom)" />
              </div>
              <div
                :title="getRowContent('row5title', `${toThousand(item.sales)} / ${item.salesYoy > 0 ? '+' : ''}${toPercent(item.salesYoy)}`)"
                class="content-row"
              >
                <a-icon class="row-icon" type="heart" />
                <label v-if="dateType === 1">{{ $t('manfbrandOverview.overview.card.row5title', { month }) }}</label>
                <label v-if="dateType === 2">{{ $t('manfbrandOverview.overview.card.row5title2', { quarter }) }}</label>
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
    </div>
  </div>
</template>

<script>
import { Card, Spin } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwFilter from '@/components/filter/index'
import IwFilterRadio from '@/components/filter/radio'
export default {
  components: {
    ACard: Card,
    ASpin: Spin,
    IwBanner,
    IwFilter,
    IwFilterRadio
  },
  data() {
    return {
      dataForm: {
      },
      //
      platform: '',
      dataSource: '',
      manfbrand: '',
      //
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
  methods: {
    handleFilterChange(form) {
      console.log(form)
      this.dataForm = { ...this.dataForm, ...form }
      console.log(this.dataForm)
    },
    handleFilterRadioChange(form) {
      console.log(form)
      this.dataForm = { ...this.dataForm, ...form }
      console.log(this.dataForm)
    },
    // init: _.debounce(
    //   function() {
    //     this.reset()
    //     this.getDefaultFollow().then(() => { this.getListData() })
    //     this.getSubmodelOptions()
    //   },
    //   100
    // ),
    getBulbText(type) {
      switch (type) {
        case 1:
          return this.$t(`manfbrandOverview.overview.card.redBulbText`)
        case 2:
          return this.$t(`manfbrandOverview.overview.card.greenBulbText`)
        case 3:
          return this.$t(`manfbrandOverview.overview.card.yellowBulbText`)
        default:
          return ''
      }
    },
    toThousand(value, fixed = 0) {
      // return toThousand(value, fixed)
    },
    toPercent(value, fixed = 1) {
      // return toPercent(value, fixed)
    },
    getRowContent(label, joinStr) {
      let content = ''
      if (this.dateType === 1) {
        content += this.$t(`manfbrandOverview.overview.card.${label}`, { month: this.month })
      }
      if (this.dateType === 2) {
        content += this.$t(`manfbrandOverview.overview.card.${label}2`, { quarter: this.quarter })
      }
      return `${content}：${joinStr}`
    },
    handlePageChage(page) { // 分页器当前页变化处理
      this.currentPage = page
    },
    reset() {
      // this.currentPage = 1
      // this.selectedFilter = 1
      // this.showLetter = false
      // this.submodel = []
    },
    getDefaultFollow() { // 获取默认关注列表
      // return new Promise((resolve, reject) => {
      //   if (!isEmpty(this.manfbrand.key) && !isEmpty(this.dataSource) && !isEmpty(this.dateType) && !isEmpty(this.ym) && !isEmpty(this.platform)) {
      //     this.listLoading = true
      //     getAttentionList({
      //       'dataSource': this.dataSource,
      //       'manfBrandId': this.manfbrand.key,
      //       'mqFlag': this.dateType,
      //       'mqId': this.ym,
      //       'platformEnum': this.platform,
      //       'typeId': 1
      //     })
      //       .then(res => {
      //         const data = res.data
      //         this.submodel = data
      //         this.defaultSubmodel = _.cloneDeep(data)
      //         this.listLoading = false
      //         resolve()
      //       })
      //       .catch(err => {
      //         this.listLoading = false
      //         reject(err)
      //       })
      //   } else {
      //     resolve()
      //   }
      // })
    },
    saveFollow() { // 保存关注列表
      // return saveAttention({
      //   'manfBrandId': this.manfbrand.key,
      //   'subModelIds': this.submodel,
      //   'typeId': 1
      // })
      //   .then(() => {
      //     this.defaultSubmodel = _.cloneDeep(this.submodel)
      //   })
    },
    getListData() { // 获取列表数据
      // if (!isEmpty(this.dateType) && !isEmpty(this.dataSource) && !isEmpty(this.ym) && !isEmpty(this.platform) && !isEmpty(this.submodel)) {
      //   this.listLoading = true
      //   getSubmanfbrandOverview({
      //     'dataSource': this.dataSource,
      //     'mqFlag': this.dateType,
      //     'mqId': this.ym,
      //     'platform': this.platform,
      //     'subModelId': this.submodel
      //   })
      //     .then(res => {
      //       this.listData = res.data
      //       this.totalPageSize = this.listData.length
      //       this.listLoading = false
      //     })
      //     .catch(err => {
      //       this.currentPage = 1
      //       this.totalPageSize = 0
      //       this.listLoading = false
      //       throw err
      //     })
      // } else {
      //   if (isEmpty(this.submodel)) {
      //     this.listData = []
      //     this.currentPage = 1
      //     this.totalPageSize = 0
      //   }
      // }
    },
    getSubmodelOptions() { // 只可选择本品厂商品牌的车型，多选项
      // if (!isEmpty(this.dateType) && !isEmpty(this.manfbrand.key) && !isEmpty(this.ym) && !isEmpty(this.platform)) {
      //   this.submodelOptionsLoading = true
      //   getSubmodel({
      //     'flag': true,
      //     'manfBrandId': this.manfbrand.key,
      //     'mqFlag': this.dateType,
      //     'mqId': this.ym,
      //     'platformEnum': this.platform
      //   })
      //     .then(res => {
      //       const data = res.data
      //       this.segmentSubModel = data[0]
      //       this.brandSubModel = data[1]
      //       this.submodelData = this.segmentSubModel
      //       this.submodelOptionsLoading = false
      //     })
      //     .catch(err => {
      //       this.submodelOptionsLoading = false
      //       throw err
      //     })
      // }
    },
    // handleFilterChange(value, key) {
    //   this.selectedFilter = value
    //   if (value === 1) {
    //     this.showLetter = false
    //     this.submodelData = this.segmentSubModel
    //   } else {
    //     this.showLetter = true
    //     this.submodelData = this.brandSubModel
    //   }
    // },
    handleSubmodelChange(value, texts) {
      // this.submodel = value
      // this.currentPage = 1
      // this.getListData()
      // this.saveFollow()
    },
    handleSetTop(id) {
      // const index = _.indexOf(this.submodel, id)
      // const top = this.submodel.splice(index, 1)
      // this.submodel = [
      //   ...top,
      //   ...this.submodel
      // ]
      // this.saveFollow()
      // this.currentPage = 1
      // this.getListData()
    },
    handleRemoveSubmodel(id) {
      // if (this.submodel.length === 1) {
      //   message.error(this.$t('manfbrandOverview.overview.card.removeErr'))
      //   return
      // }
      // const index = _.indexOf(this.submodel, id)
      // this.submodel.splice(index, 1)
      // this.saveFollow().then(() => { message.success(this.$t('manfbrandOverview.overview.card.removeSuccess')) })
      // if (this.currentPage > 1 && this.currentPage > Math.ceil(this.submodel.length / this.pageSize)) {
      //   this.currentPage = 1
      // }
      // this.getListData()
    },
    handleGotoAnalyse(submodel) {
      // saveBrowsingHistory({
      //   'recordType': 1,
      //   'refferId': submodel.id
      // })
      //   .then(response => {
      //     this.$router.push({
      //       name: 'modelAnalysis',
      //       params: {
      //         submodel
      //       }
      //     })
      //   })
    }
  }
}
</script>
