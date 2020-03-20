<template>
  <div class="manfbrand-overview">
    <iw-banner :title="$t('modelOverview.banner.title')" />
    <div :style="{'padding-top': $store.state.app.filter!=='fixed' ? '10px' : '76px'}" class="main-content">
      <iw-filter
        :id="$store.state.app.filter!=='fixed'?'overview-analyse':''"
        :show="{ dataTimeType: true, dataSource: true, manfBrand: true, dataType: true }"
        :data-time-range="true"
        :multiple="{ manfBrand: true }"
        @change="handleFilterChange"
      />
      <iw-filter-radio @change="handleFilterRadioChange" />
    </div>
  </div>
</template>

<script>
import IwBanner from '@/components/banner/index'
import IwFilter from '@/components/filter/index'
import IwFilterRadio from '@/components/filter/radio'
export default {
  components: {
    IwBanner,
    IwFilter,
    IwFilterRadio
  },
  data() {
    return {
      dataForm: {
      }
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
    }
  }
}
</script>
