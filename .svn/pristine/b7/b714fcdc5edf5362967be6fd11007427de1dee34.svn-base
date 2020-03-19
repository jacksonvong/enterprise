<template>
  <ul class="banner-select">
    <li v-if="showDataSource">
      <span class="dropdown-label">数据源：</span>
      <a-select
        v-model="dataForm.dataSourceId"
        :disabled="!enabledDataSource"
        style="min-width: 120px"
        class="noboder"
        size="small"
        :placeholder="$t('common.selectSource')"
        :get-popup-container="element => element.parentNode"
        @change="changeSource"
      >
        <a-select-option
          v-for="(item, key) in sourceOptions"
          :key="key"
          :value="item.id"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
    </li>
    <li v-if="showDateTime">
      <span class="dropdown-label">时间：</span>
      <a-month-picker
        v-model="dataForm.ym"
        :disabled="!enabledDateTime"
        class="noboder"
        size="small"
        style="width: 90px"
        :placeholder="$t('common.selectMonth')"
        format="YYYY/MM"
        :disabled-date="disabledDate"
        :get-calendar-container="element => element.parentNode"
        :allow-clear="false"
        @change="changeTime"
      >
        <div slot="monthCellContentRender" slot-scope="date">
          {{ String(date).split(" ")[1] | monthFilter() }}
        </div>
      </a-month-picker>
    </li>
    <li v-if="showManf">
      <span class="dropdown-label">厂商：</span>
      <iw-manf
        v-model="manf"
        :enabled="enabledManf"
        :data="manfOptions"
        style="display: inline-block;"
        @input="changeManf"
      />
    </li>
    <li v-if="includeSubModel && showSubModel">
      <span class="dropdown-label">车型：</span>
      <span class="model-text">{{ subModelInfo.name || '车型' }}</span>
    </li>
  </ul>
</template>

<script>
import { Select, DatePicker } from 'ant-design-vue'
import IwManf from '@/components/manfSelect'
import { getDataTime, getManfs, getManfDataTime } from '@/api/common'
import { getCarInfo, getMaxSalesSubModel } from '@/api/modelOverview'
import { addPath } from '@/utils/helper'
import moment from 'moment'

export default {
  name: 'IwBannerSelect',
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
    AMonthPicker: DatePicker.MonthPicker,
    IwManf
  },
  props: {
    enabledDataSource: {
      type: Boolean,
      default() {
        return true
      }
    },
    enabledDateTime: {
      type: Boolean,
      default() {
        return true
      }
    },
    enabledManf: {
      type: Boolean,
      default() {
        return true
      }
    },
    showDataSource: {
      type: Boolean,
      default: true
    },
    showDateTime: {
      type: Boolean,
      default: true
    },
    showManf: {
      type: Boolean,
      default: true
    },
    showSubModel: {
      type: Boolean,
      default: false
    },
    subModelId: {
      type: [String, Number],
      default() {
        return ''
      }
    },
    includeSubModel: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      manf: {},
      dataForm: {
        dataSourceId: undefined,
        ym: this.$store.state.app.dataTime ? moment(this.$store.state.app.dataTime) : undefined,
        manfId: undefined,
        manfName: undefined,
        subModelId: this.subModelId || this.$store.state.app.subModelId,
        segmentName: undefined
      },
      sourceOptions: [],
      timeOptions: [],
      manfOptions: [],
      modelsOptions: [],
      fuelTypeOptions: [],
      fuelTypeId: '',
      typeId: 1,
      subModelInfo: {}
    }
  },
  computed: {
    dataTimeRange() {
      const _this = this
      const dataSource = _this.sourceOptions.find(item => {
        return item.id === _this.dataForm.dataSourceId
      }) || _this.sourceOptions[0] || {}
      const dataTimeRange = [dataSource.startYm || '200901', dataSource.endYm || '204912']
      return dataTimeRange
    }
  },
  watch: {
  },
  created() {
    this.getData()
  },
  methods: {
    async changeSource() {
      const dataSource = this.sourceOptions.find(item => {
        return item.id === this.dataForm.dataSourceId
      }) || this.sourceOptions[0] || {}
      this.dataForm.ym = moment(dataSource.endYm + '01')
      this.$store.dispatch('setDataSource', dataSource)
      await this.getManfsData()
      this.$emit('change', this.dataForm)
    },
    async changeTime() {
      this.$store.dispatch('setDataTime', Number(this.dataForm.ym.format('YYYYMM')))
      await this.getManfsData()
      this.$emit('change', this.dataForm)
    },
    async changeManf(manf) {
      this.manf = manf
      this.dataForm.manfId = manf.manfId
      this.dataForm.manfName = manf.manfName
      this.$store.dispatch('setManf', manf)
      this.getManfDataTime()
      await this.getSubModel()
      this.$emit('change', this.dataForm)
    },
    async getSubModel() {
      if (this.includeSubModel) {
        console.log(this.subModelId)
        if (!this.subModelId) {
          await this.getMaxSalesSubModel()
        }
        this.$store.dispatch('setSubModelId', this.dataForm.subModelId)
        this.$router.push({ path: addPath(this.$route, this.dataForm.subModelId) })
        if (this.dataForm.subModelId) {
          this.getSubModelInfo()
        }
      }
    },
    disabledDate(current) {
      return current &&
      (
        current < moment(this.dataTimeRange[0] + '01').startOf('month') ||
        current > moment(this.dataTimeRange[1] + '01').endOf('month') ||
        (this.timeOptions.length && !this.timeOptions.includes(Number(current.format('YYYYMM'))))
      )
    },
    handleMenuClick() {},

    // API request
    async getData() {
      await this.getDataTime()
      await this.getManfsData()
      await this.getSubModel()
      if (this.manf) {
        this.getManfDataTime()
      }
      this.$emit('change', this.dataForm)
    },
    getDataTime() {
      const _this = this
      return new Promise((resolve, reject) => {
        getDataTime()
          .then(response => {
            _this.sourceOptions = response.data || []
            // 默认选择数据源
            const dataSource = _this.$store.state.app.dataSource || _this.sourceOptions.find(item => {
              return item.selected && item.selected === true
            }) || _this.sourceOptions[0] || {}
            _this.dataForm.dataSourceId = dataSource.id
            _this.$store.dispatch('setDataSource', dataSource)
            // 默认选择时间
            const dataTime = (Number(_this.$store.state.app.dataTime) || dataSource.endYm) + '01'
            _this.dataForm.ym = moment(dataTime)
            _this.$store.dispatch('setDataTime', Number(_this.dataForm.ym.format('YYYYMM')))
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getManfsData() {
      const _this = this
      const params = {
        dataSourceId: _this.dataForm.dataSourceId,
        ym: _this.dataForm.ym.format('YYYYMM')
      }
      if (_this.subModelId) {
        params.subModelId = parseInt(_this.subModelId)
      }
      return new Promise((resolve, reject) => {
        getManfs(params)
          .then(response => {
            _this.manfOptions = response.data
            // 默认厂商
            let manf
            for (const i in _this.manfOptions) {
              const manfGroup = _this.manfOptions[i]
              manf = manfGroup.valueList.find(item => {
                return item.selected && item.selected === true
              }) || {}
              if (manf.manfId) break
            }
            _this.manf = _this.$store.state.app.manf || manf || _this.manfOptions[0].valueList[0] || {}
            _this.$store.dispatch('setManf', _this.manf)
            // _this.$store.dispatch('setSubModelId', '')
            _this.dataForm.manfId = _this.manf.manfId
            _this.dataForm.manfName = _this.manf.manfName
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getManfDataTime() {
      const _this = this
      return new Promise((resolve, reject) => {
        getManfDataTime({
          dataSourceId: _this.dataForm.dataSourceId,
          manfId: _this.dataForm.manfId
        })
          .then(response => {
            const data = response.data
            _this.timeOptions = data
            // 默认选择时间
            let dataTime = Number(_this.$store.state.app.dataTime) + '01'
            if (!data.includes(Number(_this.$store.state.app.dataTime))) {
              dataTime = data[data.length - 1] + '01'
            }
            _this.dataForm.ym = moment(dataTime)
            _this.$store.dispatch('setDataTime', Number(_this.dataForm.ym.format('YYYYMM')))
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getMaxSalesSubModel() {
      const _this = this
      return new Promise((resolve, reject) => {
        getMaxSalesSubModel({
          dataSourceId: _this.dataForm.dataSourceId,
          manfId: _this.dataForm.manfId,
          ym: _this.dataForm.ym.format('YYYYMM')
        })
          .then(response => {
            _this.dataForm.subModelId = response.data[0] || ''
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getSubModelInfo() {
      const _this = this
      return new Promise((resolve, reject) => {
        getCarInfo({
          ym: _this.dataForm.ym.format('YYYYMM'),
          subModelId: _this.dataForm.subModelId
        })
          .then(response => {
            _this.subModelInfo = response.data[0]
            _this.dataForm.segmentName = _this.subModelInfo.segment
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
</script>

<style lang="less">
@import "~@/assets/style/mixins";
.banner-select {
  .clearfix();
  height: 26px;
  line-height: 26px;
  &>li {
    float: left;
    margin-right: 25px;
    .ant-select-selection-selected-value,
    .ant-calendar-picker-input {
      color: #666;
    }
    .ant-select-enabled .ant-select-selection-selected-value,
    .ant-calendar-picker-input:not(:disabled) {
      color: #2e5aa6;
    }
  }
  .noboder {
    .ant-select-selection, .ant-input {
      border: none;
      box-shadow: none;
    }
  }
}
.dropdown-label {
  color: #3a3a3a;
  margin-right: 4px;
}
.dropdown-trigger {
  cursor: pointer;
  em {
    color: @primary-color;
  }
  i { font-size: 12px; color: rgba(0, 0, 0, 0.25); }
}
.dropdown-cont {
  .box-shadow(0, 2px, 8px, rgba(0, 0, 0, 0.15));
  .border-radius(4px);
  position: relative;
  min-width: 100px;
  padding: 5px 0;
  background-color: #fff;
  li {
    height: 32px;
    line-height: 32px;
    color: @text-color;
    padding: 0 10px;
    cursor: pointer;
    &:hover, &.on {
      background-color: #eaf3fc;
    }
  }
}
.model-text {
  color: #666;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>
