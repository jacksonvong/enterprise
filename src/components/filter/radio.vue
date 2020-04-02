<template>
  <a-card class="iw-filter-radio-container" :body-style="{padding: '15px 20px'}">
    <a-radio-group
      v-model="dataForm.segmentType"
      class="iw-filter-radio-item"
      size="small"
      @change="handleSegmentTypeChange">
      <a-radio-button :value="1">
        一级细分市场
      </a-radio-button>
      <a-radio-button :value="2">
        二级细分市场
      </a-radio-button>
    </a-radio-group>
    <a-radio-group
      v-model="dataForm.moneyOrRatio"
      class="iw-filter-radio-item"
      size="small"
      @change="handleMoneyOrRatioChange">
      <a-radio-button :value="1">
        金额
      </a-radio-button>
      <a-radio-button :value="2">
        比例
      </a-radio-button>
    </a-radio-group>
    <a-radio-group
      v-if="false"
      v-model="dataForm.monthOrQuarter"
      class="iw-filter-radio-item"
      size="small"
      @change="handleMonthOrQuarterChange">
      <a-radio-button :value="1">
        月度
      </a-radio-button>
      <a-radio-button :value="2">
        季度
      </a-radio-button>
    </a-radio-group>
  </a-card>
</template>

<script>
import { Card, Radio } from 'ant-design-vue'
export default {
  components: {
    ACard: Card,
    ARadioGroup: Radio.Group,
    ARadioButton: Radio.Button
  },
  data() {
    return {
      dataForm: {
        segmentType: 1,
        moneyOrRatio: 1,
        monthOrQuarter: 1
      }
    }
  },
  methods: {
    handleSegmentTypeChange(value) {
      console.log(value)
      this.$emit('change', this.dataFormFilter())
    },
    handleMoneyOrRatioChange(value) {
      console.log(value)
      this.$emit('change', this.dataFormFilter())
    },
    handleMonthOrQuarterChange(value) {
      console.log(value)
      this.$emit('change', this.dataFormFilter())
    },
    dataFormFilter() {
      return this.dataForm
    }
  }
}
</script>

<style lang="less" scoped>
.iw-filter-radio-container {
  .iw-filter-radio-item {
    margin: 0 10px;
    &:first-child {
      margin-left: -5px;
    }
  }
}
</style>
