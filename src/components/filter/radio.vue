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
      v-model="dataForm.dataType"
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
      v-model="dataForm.dataTimeType"
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
        segmentType: this.$store.getters.condition.segmentType,
        dataType: this.$store.getters.condition.dataType,
        dataTimeType: this.$store.getters.condition.dataTimeType
      }
    }
  },
  created() {
    const { segmentType, dataType, dataTimeType } = this.$store.getters.condition
    this.dataForm = {
      segmentType,
      dataType,
      dataTimeType
    }
  },
  methods: {
    handleSegmentTypeChange() {
      this.$store.dispatch('setCondition', { segmentType: this.dataForm.segmentType })
      this.$emit('change', this.dataFormFilter())
    },
    handleMoneyOrRatioChange() {
      this.$store.dispatch('setCondition', { dataType: this.dataForm.dataType })
      this.$emit('change', this.dataFormFilter())
    },
    handleMonthOrQuarterChange(value) {
      this.$store.dispatch('setCondition', { dataTimeType: this.dataForm.dataTimeType })
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
