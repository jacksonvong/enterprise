<template>
  <a-card :class="'banner-card--'+status" :body-style="{padding: 0}" class="banner-card">
    <a-spin :spinning="spinning.params">
      <ul class="banner-filter">
        <li v-if="show.market" class="banner-filter-item">
          <span class="filter-item_label">{{ $t('common.market') }}</span>
          <span class="filter-item_text">
            <iw-select
              v-model="dataForm.market"
              :data="searchFormData.market"
              align="left"
              size="mini"
              style="width: 160px;"
              class="iw-text-bold"
              @change="handleNewEnergyChange"
            />
          </span>
        </li>
        <li class="banner-filter-item">
          <span class="filter-item_label">{{ $t('common.datatime') }}</span>
          <span class="filter-item_text">
            <a-radio-group
              v-if="show.dataTimeType"
              v-model="dataForm.dataTimeType"
              :disabled="isSatisfactionPage"
              size="small"
              @change="handleDataTimeTypeChange"
            >
              <a-radio-button :value="1">{{ $t('common.dateType1') }}</a-radio-button>
              <a-radio-button :value="2">{{ $t('common.dateType2') }}</a-radio-button>
            </a-radio-group>
            <iw-date-picker
              v-show="dataForm.dataTimeType===1"
              v-model="dataForm.dataTime"
              :picker-options="pickerOptions"
              :clearable="false"
              :editable="false"
              :type="dataTimeRange?'monthrange':'month'"
              :style="{width: (dataTimeRange?'160px':'100px')}"
              format="yyyy/MM"
              value-format="yyyyMM"
              align="right"
              size="mini"
              class="iw-text-bold"
              @change="handleDateTimeChange"
            />
            <iw-date-picker
              v-show="dataForm.dataTimeType===2"
              v-model="dataForm.dataTime2"
              :picker-options="pickerOptions"
              :clearable="false"
              :editable="false"
              :type="dataTimeRange?'quarterrange':'quarter'"
              :style="{width: (dataTimeRange?'160px':'100px')}"
              format="yyyy/QQ"
              value-format="yyyyQ"
              align="right"
              size="mini"
              class="iw-text-bold"
              @change="handleDateTimeChange"
            />
          </span>
        </li>
        <li v-if="show.dataSource" class="banner-filter-item">
          <span class="filter-item_label">
            <span>{{ $t('common.dataSource') }}</span>
            <span class="filter-item_label--tips">
              <iw-popover
                trigger="hover"
                placement="right-start"
                :body-style="{padding: '10px'}"
                :offset="{top: -10}"
                :show-arrow="true"
                :width="null"
                popper-class="iw-data-source-desc"
              >
                <div slot="reference">
                  <div class="question-circle">
                    <a-icon class="question" type="question" />
                  </div>
                </div>
                <div v-if="searchFormData.dataSource.length">
                  <div v-for="(item, key) in searchFormData.dataSource" :key="key">
                    {{ item.value }}: {{ item.endYm }}
                  </div>
                </div>
              </iw-popover>
            </span>
          </span>
          <span class="filter-item_text">
            <iw-select
              v-model="dataForm.dataSource"
              :data="searchFormData.dataSource"
              align="left"
              size="mini"
              style="width: 150px;"
              class="iw-text-bold"
              @change="handleDataSourceChange"
            />
          </span>
        </li>
        <li v-if="show.dimensionType" class="banner-filter-item" style="border-right: 0;">
          <span class="filter-item_label">{{ $t('common.dimension') }}</span>
          <span class="filter-item_text">
            <a-radio-group
              v-model="dataForm.dimensionType"
              size="small"
            >
              <a-radio-button :value="1">{{ $t('common.segment') }}</a-radio-button>
              <a-radio-button :value="2">{{ $t('common.manfBrand') }}</a-radio-button>
            </a-radio-group>
          </span>
        </li>
        <li v-if="(show.dimensionType||show.segment)&&dataForm.dimensionType==1" class="banner-filter-item">
          <span class="filter-item_label">{{ $t('common.segment') }}</span>
          <span class="filter-item_text">
            <iw-cascader-table
              v-model="dataForm.segment"
              :data="searchFormData.segment"
              :show-search="true"
              :leafs-per-column="2"
              :title="$t('common.segment')"
              :placeholder="$t('common.any')"
              :multiple="multiple.segment"
              exclusion
              show-selected
              placement="bottomLeft"
              size="mini"
              style="width: 150px;"
              class="iw-text-bold"
              @change="handleSegmentChange"
            />
          </span>
        </li>
        <li v-if="(show.dimensionType||show.manfBrand)&&dataForm.dimensionType==2" class="banner-filter-item">
          <span class="filter-item_label">{{ $t('common.manfBrand') }}</span>
          <span class="filter-item_text">
            <iw-manfbrand
              v-model="dataForm.manfBrand"
              :texts="dataForm.manfBrandText"
              :data="searchFormData.manfBrand"
              :show-search="true"
              :height="260"
              :leafs-per-column="5"
              :title="$t('common.manfBrand')"
              :placeholder="$t('common.any')"
              :multiple="multiple.manfBrand"
              placement="bottomLeft"
              size="mini"
              style="width: 150px;"
              class="iw-text-bold"
              @change="handleManfChange"
            />
          </span>
        </li>
        <li v-if="show.subModel" class="banner-filter-item">
          <span class="filter-item_label">{{ $t('common.subModel') }}</span>
          <span class="filter-item_text">
            <iw-submodel
              v-model="dataForm.subModel"
              :texts="dataForm.subModelText"
              :data="searchFormData.subModel"
              :multiple="multiple.subModel"
              :show-search="true"
              :show-letter="showLetter"
              :filters="[{key: 1, value: $t('common.segment')}, {key: 2, value: $t('common.manfBrand')}, {key: 3, value: $t('common.subModelAndCompetitor')}]"
              :selected-filter="selectedFilter"
              :height="260"
              :leafs-per-column="5"
              :title="$t('common.subModel')"
              show-check-all
              placement="bottomLeft"
              size="mini"
              style="width: 150px;"
              class="iw-text-bold"
              @filterChange="handleFilterChange"
              @change="handleSubModelChange"
            />
          </span>
        </li>
        <li v-if="show.competitor" class="banner-filter-item">
          <span class="filter-item_label clearfix">
            <em class="filter-item_label--title">{{ $t('common.competitor') }}</em>
            <em :title="dataForm.compCircleName" class="filter-item_label--circle">{{ dataForm.compCircleName }}</em>
          </span>
          <span class="filter-item_text">
            <iw-favorite
              ref="competitive-circle"
              v-model="dataForm.compCircle"
              :data="searchFormData.competitiveCircle"
              :type="type"
              :type-data="typeData"
              :loading="spinning.save"
              :show-folder="false"
              :show-selected="true"
              :title="$t('common.subModel')"
              placement="bottomLeft"
              style="width: 420px;"
              class="iw-text-bold"
              size="mini"
              require
              @change="handleJpChange"
              @save="handleJpSave"
            >
              <span slot="desc" class="iw-favorite__desc">
                <abbr class="font-blue">■ {{ $t('iw.submodel.local') }} </abbr>
                <abbr class="font-orange">■ {{ $t('iw.submodel.import') }}</abbr>
              </span>
            </iw-favorite>
          </span>
        </li>
        <li v-if="show.reward" class="banner-filter-item">
          <span class="filter-item_label">{{ $t('common.reward') }}</span>
          <span class="filter-item_text">
            <iw-cascader-table
              v-model="dataForm.reward"
              :data="searchFormData.reward"
              :show-search="true"
              :leafs-per-column="3"
              :title="$t('common.reward')"
              :placeholder="$t('common.any')"
              multiple
              exclusion
              show-selected
              placement="bottomLeft"
              size="mini"
              style="width: 170px;"
              class="iw-text-bold"
              @change="handleRewardChange"
            />
          </span>
        </li>
        <li v-if="show.dataType" class="banner-filter-item">
          <span class="filter-item_label">{{ $t('common.dataType') }}</span>
          <span class="filter-item_text">
            <a-radio-group
              v-model="dataForm.dataType"
              size="small"
              @change="handleDataTypeChange"
            >
              <a-radio-button :value="1">{{ $t('common.money') }}</a-radio-button>
              <a-radio-button :value="2">{{ $t('common.ratio') }}</a-radio-button>
            </a-radio-group>
          </span>
        </li>
      </ul>
      <a-icon v-if="true" :class="'banner-pushpin--'+status" class="banner-pushpin" type="pushpin" @click="changeStatus()" />
    </a-spin>
  </a-card>
</template>

<script>
import { Card, Icon, Radio, Spin } from 'ant-design-vue'
import moment from 'moment'
import { get } from 'lodash'
import {
  getPlatformList,
  getDatasource,
  getTimeRange,
  getManfbrand,
  getSegment,
  getReward,
  getSubmodel,
  getCompCircles,
  saveCompCircle,
  saveBrowsingHistory,
  getDefaultRecord
} from '@/api/filter'

export default {
  name: 'BannerFilter',
  components: {
    ACard: Card,
    AIcon: Icon,
    ARadioGroup: Radio.Group,
    ARadioButton: Radio.Button,
    ASpin: Spin
  },
  props: {
    show: {
      type: Object,
      default() {
        return {
          market: false,
          dataTimeType: false,
          dataSource: false,
          dimensionType: false,
          segment: false,
          manfBrand: false,
          subModel: false,
          competitor: false,
          reward: false
        }
      }
    },
    multiple: {
      type: Object,
      default() {
        return {
        }
      }
    },
    dataTimeRange: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      status: this.$store.state.app.filter, // false：默认，true：固定
      dataForm: {
        market: 1,
        dimension: null, // 维度
        dataSource: null,
        dataTimeType: 1,
        dataTime: null,
        dataTime2: null,
        dimensionType: 2,
        segment: [],
        reward: [],
        dataType: 1,
        manfBrand: [],
        manfBrandText: [],
        subModel: [],
        subModelText: [],
        compCircle: null,
        compCircleName: null,
        jpId: [],
        jp: []
      },
      searchFormData: {
        market: [{ key: 1, value: this.$t('common.wholeMarket') }, { key: 2, value: this.$t('common.newEnergyMarket') }],
        dimension: [],
        dataSource: [],
        dataTime: [],
        manfBrand: [],
        segment: [],
        reward: [],
        subModel: [],
        competitiveCircle: []
      },
      loading: false,
      showLetter: false,
      selectedFilter: 1,
      segmentSubModel: [],
      brandSubModel: [],
      competitorSubModel: [],
      // 竞争圈
      showModal: false,
      spinning: {
        params: false,
        save: false
      },
      type: 'subModel', // 竞争圈是车型竞争圈，还是厂商竞争圈
      typeData: [] // 编辑状态下的[manfBrand, subModel]数据源
    }
  },
  computed: {
    pickerOptions() { // 日期选择控制
      const momentStartDate = this.searchFormData.dataTime[0]
      const momentEndDate = this.searchFormData.dataTime[1]
      return {
        disabledDate(time) {
          const momentDate = moment(time)
          return momentDate.isBefore(momentStartDate) || momentDate.isAfter(momentEndDate)
        }
      }
    },
    isOverviewPage() {
      return this.$route.path === '/enterprise/manfbrand-overview'
    },
    isSatisfactionPage() {
      return this.$route.path === '/enterprise/satisfaction-analyse'
    },
    dimensionText() {
      const dimension = this.searchFormData.dimension.find(item => item.key === this.dataForm.dimension)
      if (dimension) {
        return dimension.value
      }
      return ''
    }
  },
  watch: {
    'spinning.params'(cur) {
      this.$store.dispatch('changeCommonParamsLoading', cur || this.spinning.save)
    },
    'spinning.save'(cur) {
      this.$store.dispatch('changeCommonParamsLoading', cur || this.spinning.params)
    }
  },
  created() {
    this.getData()
  },
  methods: {
    changeStatus() {
      this.status = this.status === 'fixed' ? 'default' : 'fixed'
      this.$store.dispatch('toggleFilter', this.status)
    },
    handleNewEnergyChange(value) {
      this.dataForm.market = value
      this.$emit('change', this.dataFormFilter())
    },
    async handleDimensionChange(value, text) {
      this.dataForm.dimension = value
      this.$store.dispatch('setDimension', value)
      this.spinning.params = true
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleDataSourceChange(value) {
      this.dataForm.dataSource = value
      this.$store.dispatch('setDataSource', value)
      this.spinning.params = true
      if (!this.isOverviewPage) {
        // await this.getCompCircles()
      }
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleDataTimeTypeChange() {
      const dataTimeType = this.dataForm.dataTimeType
      this.$store.dispatch('setDataTimeType', dataTimeType)
      this.spinning.params = true
      await this.getTimeRange()
      if (!this.isOverviewPage) {
        await this.getSubmodelOptions()
        // await this.getCompCircles()
      } else {
        await this.getManfbrandOptions()
      }
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleDateTimeChange(value) {
      if (this.dataForm.dataTimeType === 1) {
        this.dataForm.dataTime = value
        this.$store.dispatch('setDataTime', value instanceof Array ? value[value.length - 1] : value)
      }
      if (this.dataForm.dataTimeType === 2) {
        this.dataForm.dataTime2 = value
        this.$store.dispatch('setDataTime2', value instanceof Array ? value[value.length - 1] : value)
      }
      this.spinning.params = true
      if (!this.isOverviewPage) {
        await this.getSubmodelOptions()
        // await this.getCompCircles()
      } else {
        await this.getManfbrandOptions()
      }
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleSegmentChange(value, text) {
      this.dataForm.segment = value
      // this.$store.dispatch('setManfBrand', text)
      this.spinning.params = true
      // this.setDefaultManfbrand() // 记录选中的厂商
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleManfChange(value, text) {
      this.dataForm.manfBrand = value
      this.dataForm.manfBrandText = text
      this.$store.dispatch('setManfBrand', text)
      this.spinning.params = true
      this.setDefaultManfbrand() // 记录选中的厂商
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleSubModelChange(value, text) {
      this.dataForm.subModel = value
      this.dataForm.subModelText = text
      this.$store.dispatch('setSubModel', text)
      this.spinning.params = true
      this.setDefaultSubModel() // 记录选中的车型
      // await this.getCompCircles()
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    handleJpChange(value, text) {
      this.dataForm.compCircle = value
      this.dataForm.compCircleName = text.value
      this.dataForm.jpId = text.children.map(item => item.key)
      this.dataForm.jp = text.children
      this.setDefaultCompCircle() // 记录选中的竞争圈
      this.$emit('change', this.dataFormFilter())
    },
    async handleRewardChange(value, text) {
      this.dataForm.reward = value
      this.spinning.params = true
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleDataTypeChange() {
      this.$emit('change', this.dataFormFilter())
    },
    handleFilterChange(value) {
      this.loading = true
      this.selectedFilter = value
      if (value === 1) {
        this.searchFormData.subModel = this.segmentSubModel
        this.showLetter = false
      }
      if (value === 2) {
        this.searchFormData.subModel = this.brandSubModel
        this.showLetter = true
      }
      if (value === 3) {
        this.searchFormData.subModel = this.competitorSubModel
        this.showLetter = true
      }
      this.loading = false
    },
    dataFormFilter() { // 格式化filter返出数据
      const dataForm = {
        market: this.dataForm.market,
        dimension: this.dataForm.dimension,
        dataSourceId: this.dataForm.dataSource, // 数据源Id,开票数:5,上险数:6
        dataTimeType: this.dataForm.dataTimeType,
        ym: this.dataForm.dataTimeType === 2 ? this.dataForm.dataTime2 : this.dataForm.dataTime, // 年月
        manfId: Array.isArray(this.dataForm.manfBrand) ? get(this.dataForm.manfBrand.slice(-1), '[0][0]', null) : null, // 厂商Id
        manfbrand: Array.isArray(this.dataForm.manfBrandText) ? get(this.dataForm.manfBrandText.slice(-1), '[0][0]', null) : null, // 厂商所有信息
        subModelId: Array.isArray(this.dataForm.subModel) ? get(this.dataForm.subModel.slice(-1), '[0]', null) : null, // 本品子车型Id
        submodel: Array.isArray(this.dataForm.subModelText) ? get(this.dataForm.subModelText.slice(-1), '[0]', null) : null, // 子车型所有信息
        jpId: this.dataForm.jpId,
        jp: this.dataForm.jp,
        compCircleName: this.dataForm.compCircleName
      }
      return dataForm
    },
    async getData() {
      this.spinning.params = true
      const dimension = this.getDimensionOptions()
      this.getDatasourceOptions()
      await dimension
      const dataTime = this.getTimeRange()
      await dataTime
      if (this.show.dimensionType || this.show.manfBrand) {
        this.getManfbrandOptions()
        await this.getDefaultManfbrand()
      }
      if (this.show.dimensionType || this.show.segment) {
        this.getSegmentOptions()
        await this.getDefaultManfbrand()
      }
      if (this.show.subModel) {
        this.getSubmodelOptions()
        await this.getDefaultSubmodel()
        // await this.getCompCircles()
      }
      if (this.show.reward) {
        this.getRewardOptions()
      }
      this.$set(this.spinning, 'params', false)
      this.$emit('change', this.dataFormFilter())
    },
    getDimensionOptions() { // 获取维度选项
      return new Promise((resolve, reject) => {
        getPlatformList()
          .then(res => {
            const data = res.data
            this.searchFormData.dimension = data
            this.dataForm.dimension = this.searchFormData.dimension[0].key
            const storeDimension = this.$store.state.app.dimension
            if (storeDimension) {
              this.dataForm.dimension = storeDimension
            }
            resolve()
          })
          .catch(res => {
            reject()
          })
      })
    },
    getDatasourceOptions() { // 获取数据源选项
      return new Promise((resolve, reject) => {
        getDatasource()
          .then(res => {
            const data = res.data
            this.searchFormData.dataSource = data
            this.dataForm.dataSource = data[0].key
            const storeDatasource = this.$store.state.app.dataSource
            if (storeDatasource) {
              this.dataForm.dataSource = storeDatasource
            }
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getTimeRange() { // 获取时间可选范围
      // const storeDataTimeType = this.$store.state.app.dataTimeType
      // if (storeDataTimeType) {
      //   this.dataForm.dataTimeType = storeDataTimeType
      // }

      return new Promise((resolve, reject) => {
        getTimeRange({
          platformEnum: this.dataForm.dimension,
          mqFlag: this.dataForm.dataTimeType
        })
          .then(res => {
            const data = res.data
            let format = ''
            if (this.dataForm.dataTimeType === 1) {
              format = 'YYYYMM'
            }
            if (this.dataForm.dataTimeType === 2) {
              format = 'YYYYQ'
            }

            const momentStartDate = moment(data.startYm, 'YYYYMM')
            const momentEndDate = moment(data.endYm, 'YYYYMM')
            this.searchFormData.dataTime = [momentStartDate, momentEndDate]

            if (this.dataForm.dataTimeType === 1) {
              this.dataForm.dataTime = momentEndDate.format(format)
              const storeDataTime = this.$store.state.app.dataTime
              if (storeDataTime) {
                this.dataForm.dataTime = storeDataTime
              }
              // 兼容时间段的情况
              const dataTime = this.dataForm.dataTime
              if (this.dataTimeRange) {
                const startDate = Math.max(moment(dataTime, format).subtract(2, 'months'), momentStartDate)
                this.dataForm.dataTime = dataTime instanceof Array ? dataTime : [moment(startDate).format(format), dataTime]
              }
            }

            if (this.dataForm.dataTimeType === 2) {
              this.dataForm.dataTime2 = momentEndDate.format(format)
              const storeDataTime2 = this.$store.state.app.dataTime2
              if (storeDataTime2) {
                this.dataForm.dataTime2 = storeDataTime2
              }
              // 兼容时间段的情况
              const dataTime = this.dataForm.dataTime2
              console.log(this.dataForm.dataTime2)
              if (this.dataTimeRange) {
                this.dataForm.dataTime2 = dataTime instanceof Array ? dataTime : [dataTime, dataTime]
              }
            }
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getDefaultManfbrand() { // 获取默认选择的厂商品牌
      return new Promise((resolve, reject) => {
        getDefaultRecord({
          platformEnum: this.dataForm.dimension,
          recordType: 3
        })
          .then(res => {
            const data = res.data
            this.dataForm.manfBrand = [[data.key]]
            this.dataForm.manfBrandText = [[data]]
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getManfbrandOptions() { // 获取厂商品牌选项
      return new Promise((resolve, reject) => {
        const params = this.dataFormFilter()
        getManfbrand({
          'platformEnum': params.dimension,
          'mqFlag': params.dataTimeType,
          'mqId': params.ym
        })
          .then(res => {
            const data = res.data
            this.searchFormData.manfBrand = data
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    setDefaultManfbrand() { // 记录选择的厂商
      return new Promise((resolve, reject) => {
        const params = this.dataFormFilter()
        saveBrowsingHistory({
          'recordType': 3,
          'refferId': params.manfId
        })
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    getSegmentOptions() { // 获取细分市场选项
      return new Promise((resolve, reject) => {
        const params = this.dataFormFilter()
        getSegment({
          'platformEnum': params.dimension,
          'mqFlag': params.dataTimeType,
          'mqId': params.ym
        })
          .then(res => {
            const data = res.data
            this.searchFormData.segment = data
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    getRewardOptions() { // 获取奖励类型选项
      return new Promise((resolve, reject) => {
        const params = this.dataFormFilter()
        getReward({
          'platformEnum': params.dimension,
          'mqFlag': params.dataTimeType,
          'mqId': params.ym
        })
          .then(res => {
            const data = res.data
            this.searchFormData.reward = data
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    getDefaultSubmodel() { // 获取默认选择的车型
      return new Promise((resolve, reject) => {
        getDefaultRecord({
          platformEnum: this.dataForm.dimension,
          recordType: 1
        })
          .then(res => {
            const submodel = res.data
            this.dataForm.subModel = [submodel.key]
            this.dataForm.subModelText = [submodel]
            const paramsSubmodel = this.$route.params.submodel
            if (paramsSubmodel) {
              paramsSubmodel.key = paramsSubmodel.id
              paramsSubmodel.value = paramsSubmodel.name
              this.dataForm.subModel = [paramsSubmodel.key]
              this.dataForm.subModelText = [paramsSubmodel]
            }
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    getSubmodelOptions() { // 获取子车型选项
      return new Promise((resolve, reject) => {
        const params = this.dataFormFilter()
        getSubmodel({
          'platformEnum': params.dimension,
          'mqFlag': params.dataTimeType,
          'mqId': params.ym
        })
          .then(res => {
            const data = res.data
            this.typeData = data // 竞品圈中的车型选择
            this.segmentSubModel = data[0]
            this.brandSubModel = data[1]
            this.competitorSubModel = data[2]
            this.searchFormData.subModel = this.segmentSubModel
            this.showLetter = false
            this.selectedFilter = 1
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    setDefaultSubModel() {
      return new Promise((resolve, reject) => {
        const params = this.dataFormFilter()
        saveBrowsingHistory({
          'recordType': 1,
          'refferId': params.subModelId
        })
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    getCompCircles() { // 获取竞品圈列表
      return new Promise((resolve, reject) => {
        const params = this.dataFormFilter()
        getCompCircles({
          'dataSource': params.dataSourceId,
          'platformEnum': params.dimension,
          'subModelId': params.subModelId,
          'mqFlag': params.dataTimeType,
          'mqId': params.ym
        })
          .then(res => {
            const data = res.data
            this.$set(this.searchFormData, 'competitiveCircle', data)
            const compCircle = data.find(item => item.selected) || data[0]
            if (compCircle) {
              this.$set(this.dataForm, 'compCircle', compCircle.key)
              this.$set(this.dataForm, 'compCircleName', compCircle.value)
              this.$set(this.dataForm, 'jpId', compCircle.children.map(item => item.key))
              this.$set(this.dataForm, 'jp', compCircle.children)
            } else {
              this.$set(this.dataForm, 'compCircle', null)
              this.$set(this.dataForm, 'compCircleName', null)
              this.$set(this.dataForm, 'jpId', [])
              this.$set(this.dataForm, 'jp', [])
            }
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    setDefaultCompCircle() { // 记录默认选择竞品圈
      return new Promise((resolve, reject) => {
        saveBrowsingHistory({
          'recordType': 2,
          'refferId': this.dataForm.compCircle
        })
          .then(response => {
            this.getCompCircles()
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    handleJpSave(tableList) {
      const params = this.dataFormFilter()
      const circleList = []
      tableList.forEach(row => {
        const item = {}
        for (const x in row) {
          if (x === 'key') {
            continue
          } else {
            item[x] = row[x]
          }
        }
        if (tableList.length === 1) {
          item['selected'] = 1
        }
        circleList.push(item)
      })
      if (!['manfBrand', 'subModel'].includes(this.type)) return
      return new Promise((resolve, reject) => {
        this.spinning.save = true
        saveCompCircle({
          'circleList': circleList.map(compCircle => {
            return {
              name: compCircle.value,
              compSubModelIds: compCircle.children.map(submodel => submodel.key)
            }
          }),
          'subModelId': params.subModelId
        })
          .then(response => {
            this.getCompCircles().then(() => {
              this.$emit('change', this.dataFormFilter())
            })
            this.spinning.save = false
            resolve()
          })
          .catch(err => {
            this.spinning.save = false
            reject(err)
          })
      })
    }
  }
}
</script>

<style lang="scss">
.banner-card {
  .banner-filter {
    .banner-filter-item {
      .ant-radio-button-wrapper-disabled.ant-radio-button-wrapper-checked,
      .ant-radio-button-wrapper-disabled:first-child, .ant-radio-button-wrapper-disabled:hover {
        background-color: transparent;
      }
      .ant-radio-button-wrapper-disabled:first-child {
        span { color: #b2b4be; }
      }
    }
  }
}
</style>
<style lang="less" scope>
@import '~@/assets/style/mixins';
.banner-card {
  &.banner-card--fixed {
    position: fixed;
    top: 123px;
    right: 10px;
    bottom: 0;
    left: 20px;
    z-index: 990;
    height: 54px;
    background: #fff;
  }
  .banner-filter {
    height: 72px;
    background: #fff;
    overflow: hidden;
    .banner-filter-item {
      display: block;
      float: left;
      height: 100%;
      border-right: 1px solid #eee;
      > span {
        display: block;
        &.filter-item_label {
          color: #9494AD;
          font-size: 12px;
          padding: 12px 15px 0;
          i {
            font-size: 10px;
          }
          .filter-item_label--tips {
            position: absolute;
            top: 10px;
          }
          .filter-item_label--title {
            float: left;
          }
          .filter-item_label--circle {
            .text-hide();
            float: left;
            display: block;
            color: #000;
            font-weight: bold;
            margin-left: 10px;
            padding: 0 10px;
            height: 18px;
            line-height: 16px;
            color: #2E5AA6;
            border: 1px solid #2E5AA6;
            border-radius: 2px;
          }
          .question-circle {
            background: #9494AD;
            padding: 0 4px;
            border-radius: 50%;
            cursor: pointer;
            margin: 0 4px;
            top: 10px;
            .question {
              color: #fff;
              font-weight: bold;
            }
          }
        }
        &.filter-item_text {
          .iw-input .iw-input__inner {
            border: 0;
            box-shadow: none;
            padding: 0 15px;
            height: 42px;
            line-height: 42px;
          }
          .iw-range-editor.iw-input__inner {
            border: 0;
            box-shadow: none;
            padding: 0 15px;
            height: 42px;
            line-height: 42px;
          }
          .iw-text-bold {
            input {
              color: #333;
              font-weight: bold;
              font-size: 13px;
            }
          }
          .ant-radio-group {
            padding: 9px 8px;
          }
          .ant-radio-button-wrapper {
            border: 0;
            font-weight: bold;
          }
        }
      }
      .iw-footer-desc {
        font-size: 12px;
        float: left;
      }
      .iw-footer-desc--right {
        font-size: 12px;
        float: right;
      }
    }
  }
  .banner-pushpin {
    position: absolute;
    right: 6px;
    top: 6px;
    width: 20px;
    height: 20px;
    line-height: 24px;
    cursor: pointer;
    &.banner-pushpin--fixed {
      transform: rotate(-45deg);
    }
  }
}
.leftmenu-expand .banner-card {
  &.banner-card--fixed {
    left: 220px;
  }
}
.in-frame .banner-card {
  &.banner-card--fixed {
    top: 48px;
    left: 20px;
  }
}
</style>
