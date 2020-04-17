<template>
  <a-card :class="'banner-card--'+fixed" :body-style="{padding: 0}" class="banner-card">
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
              <a-radio-button :value="2">{{ $t('common.dateType1') }}</a-radio-button>
              <a-radio-button :value="1">{{ $t('common.dateType2') }}</a-radio-button>
            </a-radio-group>
            <iw-date-picker
              v-show="dataForm.dataTimeType===2"
              v-model="dataForm.dataTime"
              :picker-options="pickerOptions"
              :clearable="false"
              :editable="false"
              :type="dataTimeRange?'monthrange':'month'"
              :style="{width: (dataTimeRange?'150px':'100px'), padding: '0 8px'}"
              format="yyyy/MM"
              value-format="yyyyMM"
              align="right"
              size="mini"
              class="iw-text-bold"
              @change="handleDateTimeChange"
            />
            <iw-date-picker
              v-show="dataForm.dataTimeType===1"
              v-model="dataForm.dataTime2"
              :picker-options="pickerOptions"
              :clearable="false"
              :editable="false"
              :type="dataTimeRange?'quarterrange':'quarter'"
              :style="{width: (dataTimeRange?'150px':'100px'), padding: '0 8px'}"
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
                popper-class="iw-popover-desc"
              >
                <div slot="reference">
                  <div class="question-circle">
                    <a-icon class="question" type="question" />
                  </div>
                </div>
                <div v-if="searchFormData.dataSource.length">
                  <div v-for="(item, key) in searchFormData.dataSource" :key="key">
                    {{ item.text }}: {{ item.maxYm }}
                  </div>
                </div>
              </iw-popover>
            </span>
          </span>
          <span class="filter-item_text">
            <iw-select
              v-model="dataForm.dataSource"
              :data="searchFormData.dataSource"
              :option-props="{ value:'value', label:'text' }"
              align="left"
              size="mini"
              style="width: 150px;"
              class="iw-text-bold"
              @change="handleDataSourceChange"
            />
          </span>
        </li>
        <li v-if="show.dimension" class="banner-filter-item" style="border-right: 0;">
          <span class="filter-item_label">{{ $t('common.dimension') }}</span>
          <span class="filter-item_text">
            <a-radio-group
              v-model="dataForm.dimension"
              size="small"
              @change="handleDimensionTypeChange"
            >
              <a-radio-button :value="1">{{ $t('common.segment') }}</a-radio-button>
              <a-radio-button :value="2">{{ $t('common.manfBrand') }}</a-radio-button>
            </a-radio-group>
          </span>
        </li>
        <li v-if="(show.dimension||show.segment)&&dataForm.dimension==1" class="banner-filter-item">
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
              :option-props="{ value: 'value', label: 'text', children: 'children' }"
              select-on-leaf
              show-selected
              placement="bottomLeft"
              size="mini"
              style="width: 150px;"
              class="iw-text-bold"
              @change="handleSegmentChange"
            />
          </span>
        </li>
        <li v-if="(show.dimension||show.manfBrand)&&dataForm.dimension==2" class="banner-filter-item">
          <span class="filter-item_label">{{ $t('common.manfBrand') }}</span>
          <span class="filter-item_text">
            <iw-manfbrand
              ref="manfBrand"
              v-model="dataForm.manfBrand"
              :texts="dataForm.manfBrandText"
              :data="searchFormData.manfBrand"
              :show-search="true"
              :height="260"
              :leafs-per-column="5"
              :title="$t('common.manfBrand')"
              :placeholder="$t('common.any')"
              :multiple="multiple.manfBrand"
              :option-props="{ value: 'value', label: 'text', children: 'children' }"
              :status="status.manfBrand"
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
              :filters="subModelFilterTitles"
              :selected-filter="selectedFilter"
              :height="260"
              :leafs-per-column="5"
              :title="$t('common.subModel')"
              :option-props="{ value: 'value', label: 'text', children: 'children' }"
              show-selected
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
              :option-props="{ value: 'value', label: 'text', children: 'children' }"
              placement="bottomLeft"
              style="width: 360px;"
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
              :option-props="{ value: 'value', label: 'text', children: 'children' }"
              multiple
              select-on-leaf
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
        <li v-if="show.versionType" class="banner-filter-item">
          <span class="filter-item_label">{{ $t('common.versionType') }}</span>
          <span class="filter-item_text">
            <a-radio-group
              v-model="dataForm.versionType"
              size="small"
              @change="handleVersionTypeChange"
            >
              <a-radio-button :value="1">{{ $t('common.allVersion') }}</a-radio-button>
              <a-radio-button :value="2">{{ $t('common.version') }}</a-radio-button>
            </a-radio-group>
          </span>
        </li>
        <li v-if="show.version&&dataForm.versionType===2" class="banner-filter-item">
          <span class="filter-item_label">{{ $t('common.version') }}</span>
          <span class="filter-item_text">
            <iw-version
              v-model="dataForm.version"
              :data="searchFormData.version"
              :show-search="true"
              :title="$t('common.version')"
              :option-props="{ value: 'value', label: 'text', children: 'children' }"
              :show-data-source="false"
              multiple
              show-check-all
              size="mini"
              placement="bottomLeft"
              style="width: 180px;"
              @change="handleVersionChange"
            />
          </span>
        </li>
      </ul>
      <a-icon v-if="true" :class="'banner-pushpin--'+fixed" class="banner-pushpin" type="pushpin" @click="changeStatus()" />
    </a-spin>
  </a-card>
</template>

<script>
import { Card, Icon, Radio, Spin } from 'ant-design-vue'
import moment from 'moment'
import { get } from 'lodash'
import { copyObject } from '@/utils/helper'
import {
  getDatasource,
  getTimeRange,
  getManfbrand,
  getSegment,
  getReward,
  getVersion,
  getSubmodel,
  getCompCircles,
  saveCompCircle,
  memoryCondition,
  getDefaultSubmodel
} from '@/api/filter'
const _GET_ = 1
const _SAVE_ = 2

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
          dimension: false,
          segment: false,
          manfBrand: false,
          subModel: false,
          competitor: false,
          reward: false,
          versionType: false,
          version: false
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
      fixed: this.$store.state.app.filter, // false：默认，true：固定
      dataForm: {
        market: 1,
        dimension: 2, // 细分市场，厂商品牌
        dataSource: null,
        dataTimeType: 2,
        dataTime: null,
        dataTime2: null,
        segment: [],
        reward: [],
        version: [],
        dataType: 1,
        versionType: 1,
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
        version: [],
        subModel: [],
        competitiveCircle: []
      },
      loading: false,
      showLetter: false,
      selectedFilter: 1,
      subModelFilterTitles: [],
      // 竞争圈
      showModal: false,
      spinning: {
        params: false,
        save: false
      },
      status: {
        manfBrand: 0
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
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    let dataTime = this.dataForm.dataTime
    let dataTime2 = this.dataForm.dataTime2
    if (dataTime) {
      if (this.dataTimeRange && typeof dataTime === 'string') {
        const startDate = moment(dataTime, 'YYYYMM').subtract(2, 'months')
        dataTime = dataTime instanceof Array ? dataTime : [moment(startDate).format('YYYYMM'), dataTime]
        dataTime2 = dataTime2 instanceof Array ? dataTime2 : [moment(startDate).format('YYYYQ'), dataTime2]
      } else if (!this.dataTimeRange && typeof dataTime === 'object') {
        dataTime = dataTime[1]
        dataTime2 = dataTime2[1]
      }
      this.dataForm.dataTime = dataTime
      this.dataForm.dataTime2 = dataTime2
    }
  },
  methods: {
    changeStatus() {
      this.fixed = this.fixed === 'fixed' ? 'default' : 'fixed'
      this.$store.dispatch('toggleFilter', this.fixed)
    },
    handleNewEnergyChange(value) {
      this.dataForm.market = value
      this.$store.dispatch('setCondition', { market: value })
      this.saveCondition()
      this.$emit('change', this.dataFormFilter())
    },
    async handleDataSourceChange(value) {
      this.dataForm.dataSource = value
      this.$store.dispatch('setCondition', { dataSource: value })
      this.spinning.params = true
      this.saveCondition()
      if (this.show.competitor) {
        await this.getCompCircles()
      }
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleDataTimeTypeChange() {
      const dataTimeType = this.dataForm.dataTimeType
      this.$store.dispatch('setCondition', { dataTimeType: dataTimeType })
      this.spinning.params = true
      await this.saveCondition()
      // await this.getTimeRange()
      // if (!this.isOverviewPage) {
      //   await this.getSubmodelOptions()
      //   // await this.getCompCircles()
      // } else {
      //   await this.getManfbrandOptions()
      // }
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleDateTimeChange(value) {
      if (this.dataTimeRange) { // 时间段
        if (this.dataForm.dataTimeType === 1) { // YYYYQ
          this.dataForm.dataTime = [moment(value[0], 'YYYYQ').format('YYYYMM'), moment(value[1], 'YYYYQ').format('YYYYMM')]
        } else { // YYYYMM
          this.dataForm.dataTime2 = [moment(value[0], 'YYYYMM').format('YYYYQ'), moment(value[1], 'YYYYMM').format('YYYYQ')]
        }
      } else { // 时间
        if (this.dataForm.dataTimeType === 1) { // YYYYQ
          this.dataForm.dataTime = moment(value, 'YYYYQ').format('YYYYMM')
        } else { // YYYYMM
          this.dataForm.dataTime2 = moment(value, 'YYYYMM').format('YYYYQ')
        }
      }
      this.$store.dispatch('setCondition', { dataTime: this.dataForm.dataTime, dataTime2: this.dataForm.dataTime2 })
      this.spinning.params = true
      this.saveCondition()
      if (this.show.subModel) {
        await this.getSubmodelOptions()
        // await this.getCompCircles()
      }
      if (this.show.manfBrand) {
        await this.getManfbrandOptions()
      }
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleSegmentChange(value, text) {
      this.dataForm.segment = value
      this.$store.dispatch('setCondition', { segment: value })
      this.spinning.params = true
      await this.saveCondition()
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleManfChange(value, text) {
      this.dataForm.manfBrand = value
      this.dataForm.manfBrandText = text
      this.$store.dispatch('setCondition', { manfBrand: value })
      this.spinning.params = true
      await this.saveCondition() // 记录选中的厂商
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleSubModelChange(value, text) {
      this.dataForm.subModel = value
      this.dataForm.subModelText = text
      this.$store.dispatch('setCondition', { subModel: value })
      this.spinning.params = true
      this.saveCondition() // 记录选中的车型
      await this.getCompCircles()
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleJpChange(value, text) {
      this.dataForm.compCircle = value
      this.dataForm.compCircleName = text.text
      this.$store.dispatch('setCondition', { compCircle: value })
      this.dataForm.jpId = text.children.map(item => item.value)
      this.dataForm.jp = text.children
      await this.saveCondition()
      this.$emit('change', this.dataFormFilter())
    },
    async handleRewardChange(value, text) {
      this.dataForm.reward = value
      this.$store.dispatch('setCondition', { reward: value })
      this.spinning.params = true
      await this.saveCondition()
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleDataTypeChange(value) {
      this.$store.dispatch('setCondition', { dataType: this.dataForm.dataType })
      this.spinning.params = true
      await this.saveCondition()
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleDimensionTypeChange(value) {
      this.$store.dispatch('setCondition', { dimension: this.dataForm.dimension })
      this.spinning.params = true
      await this.saveCondition()
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    async handleVersionTypeChange() {
      this.$store.dispatch('setCondition', { versionType: this.dataForm.versionType })
      this.spinning.params = true
      await this.saveCondition()
      this.spinning.params = false
      this.$emit('change', this.dataFormFilter())
    },
    handleVersionChange(value) {
      this.dataForm.version = value
      this.$store.dispatch('setCondition', { version: value })
      this.$emit('change', this.dataFormFilter())
    },
    handleFilterChange(value) {
      this.loading = true
      this.selectedFilter = value
      this.searchFormData.subModel = this.typeData[value - 1]
      this.showLetter = value !== 1
      this.loading = false
    },
    dataFormFilter() { // 格式化filter返出数据
      const dataForm = {
        market: this.dataForm.market,
        dimension: this.dataForm.dimension,
        dataSource: this.dataForm.dataSource, // 数据源Id,开票数:5,上险数:6
        dataTimeType: this.dataForm.dataTimeType,
        dataTime: this.dataForm.dataTimeType === 1 ? this.dataForm.dataTime2 : this.dataForm.dataTime, // 年月
        maxYm: (this.searchFormData.dataSource.find(item => item.value === this.dataForm.dataSource) || {}).maxYm,
        manfBrand: Array.isArray(this.dataForm.manfBrand) ? get(this.dataForm.manfBrand.slice(-1), '[0][0]', null) : null, // 厂商Id
        manfBrandText: Array.isArray(this.dataForm.manfBrandText) ? get(this.dataForm.manfBrandText.slice(-1), '[0][0]', null) : null, // 厂商所有信息
        subModel: Array.isArray(this.dataForm.subModel) ? get(this.dataForm.subModel.slice(-1), '[0]', null) : null, // 本品子车型Id
        subModelText: Array.isArray(this.dataForm.subModelText) ? get(this.dataForm.subModelText.slice(-1), '[0]', null) : null, // 子车型所有信息
        jpId: this.dataForm.jpId,
        jp: this.dataForm.jp,
        compCircle: this.dataForm.compCircle,
        compCircleName: this.dataForm.compCircleName,
        dataType: this.dataForm.dataType,
        versionType: this.dataForm.versionType,
        version: this.dataForm.version
      }
      return dataForm
    },
    dataFormConvert(dataForm, condition, reverse = true) {
      if (reverse) {
        var {
          dataSource,
          compCircle,
          dataTimeType,
          dataType,
          segmentType,
          subModel,
          manfBrand,
          version
        } = dataForm
        const condition = {
          dataSource,
          groupId: compCircle,
          isQuarter: dataTimeType,
          moneyOrRatio: dataType,
          modelDimension: segmentType,
          subModelId: subModel[subModel.length - 1],
          manfBrandId: manfBrand && manfBrand[0] && manfBrand[0][0],
          versionId: version
        }
        return condition
      } else {
        const {
          dataSource,
          groupId: compCircle,
          isQuarter: dataTimeType,
          moneyOrRatio: dataType,
          modelDimension: segmentType,
          subModelId: subModel,
          manfBrandId: manfBrand,
          versionId: version
        } = condition
        dataForm = {
          ...dataForm,
          dataSource,
          compCircle,
          dataTimeType,
          dataType,
          segmentType,
          subModel: [subModel + ''],
          manfBrand: [[manfBrand + '']],
          version
        }
        return dataForm
      }
    },
    getCondition() { // 获取默认选择
      return new Promise((resolve, reject) => {
        const condition = this.$store.getters.condition
        if (Object.keys(condition).length) {
          this.dataForm = condition
          // 从时间段切回时间格式出错修正
          if (!this.dataTimeRange && typeof this.dataForm.dataTime === 'object' && this.dataForm.dataTime.length === 2) {
            this.dataForm.dataTime = this.dataForm.dataTime[1]
            this.dataForm.dataTime2 = this.dataForm.dataTime2[1]
          }
          resolve()
          return
        }
        memoryCondition({
          getOrSave: _GET_,
          type: 1
        })
          .then(res => {
            const data = res.data || {}
            const condition = data.data || {}
            for (const key in condition) {
              const value = condition[key]
              condition[key] = isNaN(value) ? value : Number(value)
            }
            const dataForm = this.dataFormConvert(this.dataForm, condition, false)
            this.$store.dispatch('setCondition', dataForm)
            this.dataForm = copyObject(dataForm)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    saveCondition() { // 记录选择
      return new Promise((resolve, reject) => {
        const condition = this.dataFormConvert(this.dataForm)
        memoryCondition({
          getOrSave: _SAVE_,
          type: 1,
          ...condition
        })
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    async getData() {
      this.spinning.params = true
      await this.getCondition()
      await this.getDatasourceOptions()
      await this.getTimeRange()
      if (this.show.manfBrand) {
        this.getManfbrandOptions()
      }
      if (this.show.segment) {
        this.getSegmentOptions()
      }
      if (this.show.subModel) {
        await this.getSubmodelOptions()
        await this.getDefaultSubmodel()
        if (this.show.competitor) {
          this.getCompCircles()
        }
      }
      if (this.show.reward) {
        this.getRewardOptions()
      }
      if (this.show.version) {
        this.getVersionOptions()
      }
      this.$set(this.spinning, 'params', false)
      this.$emit('change', this.dataFormFilter())
    },
    getDatasourceOptions() { // 获取数据源选项
      return new Promise((resolve, reject) => {
        const storeDataSource = this.$store.state.common.dataSource
        if (storeDataSource && storeDataSource.length) {
          this.searchFormData.dataSource = storeDataSource
          resolve()
          return
        }
        getDatasource()
          .then(res => {
            const data = res.data
            this.searchFormData.dataSource = data
            if (!this.dataForm.dataSource) {
              this.dataForm.dataSource = (data.find(item => item.selected) || data[0]).value
              this.$store.dispatch('setDataSource', data)
            }
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getTimeRange() { // 获取时间可选范围
      return new Promise((resolve, reject) => {
        const storeDataTime = this.$store.state.common.dataTime
        const storeDataTime2 = this.$store.state.common.dataTime2
        if (storeDataTime && storeDataTime.length) {
          this.searchFormData.dataTime = storeDataTime
          this.searchFormData.dataTime2 = storeDataTime2
          resolve()
          return
        }
        getTimeRange({
          salesType: this.dataForm.dataSource
        })
          .then(res => {
            const data = res.data
            const format = 'YYYYMM'
            const format2 = 'YYYYQ'
            // 最大时间处理
            const maxYm = (this.searchFormData.dataSource.find(item => item.value === this.dataForm.dataSource) || {}).maxYm || moment().format('YYYYMM')
            data.endYm = Math.min(data.endYm, maxYm)

            const momentStartDate = moment(data.startYm, format)
            const momentEndDate = moment(data.endYm, format)
            this.searchFormData.dataTime = [momentStartDate, momentEndDate]
            this.$store.dispatch('setDataTime', this.searchFormData.dataTime)
            this.dataForm.dataTime = moment(data.selected || data.endYm, 'YYYYMM').format(format)
            this.dataForm.dataTime2 = moment(data.selected || data.endYm, 'YYYYMM').format(format2)
            this.$store.dispatch('setCondition', { dataTime: this.dataForm.dataTime, dataTime2: this.dataForm.dataTime2 })
            if (this.dataTimeRange) {
              const dataTime = this.dataForm.dataTime
              const dataTime2 = this.dataForm.dataTime2
              if (typeof dataTime === 'string') {
                const startDate = moment(dataTime, 'YYYYMM').subtract(2, 'months')
                this.dataForm.dataTime = dataTime instanceof Array ? dataTime : [moment(startDate).format('YYYYMM'), dataTime]
                this.dataForm.dataTime2 = dataTime2 instanceof Array ? dataTime2 : [moment(startDate).format('YYYYQ'), dataTime2]
              }
            }
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    getManfbrandOptions() { // 获取厂商品牌选项
      return new Promise((resolve, reject) => {
        const storeManfBrand = this.$store.state.common.manfBrand
        if (storeManfBrand && storeManfBrand.length) {
          this.searchFormData.manfBrand = storeManfBrand
          resolve()
          return
        }
        const params = this.dataFormFilter()
        getManfbrand({
          selectedId: '',
          ymId: Array.isArray(params.dataTime) ? params.dataTime[1] : params.dataTime
        })
          .then(res => {
            const data = res.data
            this.searchFormData.manfBrand = data
            this.$store.dispatch('setManfBrand', this.searchFormData.manfBrand)
            this.status.manfBrand = 200
            resolve()
          })
          .catch(err => {
            this.status.manfBrand = 500
            reject(err)
          })
      })
    },

    getSegmentOptions() { // 获取细分市场选项
      return new Promise((resolve, reject) => {
        const params = this.dataFormFilter()
        getSegment({
          selectedId: '',
          ymId: Array.isArray(params.dataTime) ? params.dataTime[1] : params.dataTime
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
          selectedId: '',
          ymId: Array.isArray(params.dataTime) ? params.dataTime[1] : params.dataTime
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

    getVersionOptions() { // 获取奖励类型选项
      return new Promise((resolve, reject) => {
        const storeVersion = this.$store.state.common.version
        if (storeVersion && storeVersion.length) {
          this.searchFormData.version = storeVersion
          resolve()
          return
        }
        const params = this.dataFormFilter()
        if (!params.subModel) {
          resolve()
          return
        }
        getVersion({
          isQuarter: params.dataTimeType, // 月度季度标识:1季度; 2月度
          selectedId: '',
          subModelId: params.subModel,
          ymId: Array.isArray(params.dataTime) ? params.dataTime[1] : params.dataTime
        })
          .then(res => {
            const data = res.data
            this.searchFormData.version = data
            this.$store.dispatch('setVersion', data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    getDefaultSubmodel() { // 获取默认选择的车型
      return new Promise((resolve, reject) => {
        if (this.dataForm.subModel.length) {
          resolve()
          return
        }
        const params = this.dataFormFilter()
        getDefaultSubmodel({
          dataSource: params.dataSource,
          ymId: Array.isArray(params.dataTime) ? params.dataTime[1] : params.dataTime
        })
          .then(res => {
            const submodel = res.data
            if (submodel) {
              this.dataForm.subModel = [submodel.value]
              this.dataForm.subModelText = [submodel]
              const paramsSubmodel = this.$route.params.submodel
              if (paramsSubmodel) {
                this.dataForm.subModel = [paramsSubmodel.id]
                this.dataForm.subModelText = [{ value: paramsSubmodel.id, text: paramsSubmodel.name }]
              }
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
        const storeSubModel = this.$store.state.common.subModel
        if (storeSubModel && storeSubModel.data && storeSubModel.data.length) {
          this.typeData = storeSubModel.data // 竞品圈中的车型选择
          this.subModelFilterTitles = storeSubModel.title.map((title, index) => {
            return { value: index + 1, text: title }
          })
          this.searchFormData.subModel = this.typeData[this.selectedFilter - 1]
          resolve()
          return
        }
        const params = this.dataFormFilter()
        getSubmodel({
          selectedId: '',
          ymId: Array.isArray(params.dataTime) ? params.dataTime[1] : params.dataTime
        })
          .then(res => {
            const data = res.data
            this.typeData = data.data // 竞品圈中的车型选择
            this.subModelFilterTitles = data.title.map((title, index) => {
              return { value: index + 1, text: title }
            })
            this.selectedFilter = 1
            this.showLetter = false
            this.searchFormData.subModel = this.typeData[this.selectedFilter - 1]
            this.$store.dispatch('setSubModel', data)
            this.status.subModel = 200
            resolve()
          })
          .catch(err => {
            this.status.subModel = 500
            reject(err)
          })
      })
    },

    getCompCircles() { // 获取竞品圈列表
      const params = this.dataFormFilter()
      if (!params.subModel) return
      return new Promise((resolve, reject) => {
        getCompCircles({
          dataSource: params.dataSource,
          subModelId: params.subModel,
          groupId: params.compCircle,
          ymId: Array.isArray(params.dataTime) ? params.dataTime[1] : params.dataTime
        })
          .then(res => {
            const data = res.data || []
            this.$set(this.searchFormData, 'competitiveCircle', data.map(item => {
              item.disabledChildren = [params.submodel]
              return item
            }))
            const compCircle = data.find(item => item.selected) || data[0]
            if (compCircle) {
              this.$set(this.dataForm, 'compCircle', compCircle.value)
              this.$set(this.dataForm, 'compCircleName', compCircle.text)
              this.$set(this.dataForm, 'jpId', compCircle.children.map(item => item.value))
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
            this.$set(this.spinning, 'params', false)
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
          if (x === 'value') {
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
          circleList: circleList.map(compCircle => {
            return {
              name: compCircle.text,
              compSubModelIds: compCircle.children.map(submodel => submodel.value)
            }
          }),
          subModelId: params.subModel
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
    height: 74px;
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
          .iw-range-separator {
            line-height: 42px;
          }
          .iw-text-bold {
            input {
              color: #181C2B;
              font-weight: bold;
              font-size: 14px;
            }
          }
          .ant-radio-group {
            padding: 9px 8px;
          }
          .ant-radio-button-wrapper {
            border: 0;
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
