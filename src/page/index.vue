<template>
  <div>
    <iw-cascader
      v-model="value"
      :texts="texts"
      :data="data"
      :multiple="true"
      :show-check-all="true"
      :select-on-leaf="true"
      :column-name="['国家', '大区', '省份', '城市']"
      title="区域选择"
      placement="bottom-start"
      size="mini"
      @change="handleChange"
    />
  </div>
</template>
<script>
import { data } from '../../mock/data/common/get-region'
export default {
  name: 'Region',
  data() {
    return {
      value: [],
      texts: [],
      data: []
    }
  },
  mounted() {
    this.data = data
  },
  methods: {
    handleChange(value, texts) {
      console.log('value', value, texts)
      this.value = value
      this.texts = texts
    }
  }
}
</script>
