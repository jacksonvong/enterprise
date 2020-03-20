<template>
  <div class="terminal-excition-search">
    <iw-banner :title="$t('modelOverview.banner.title')" />
    <div :style="{'padding-top': $store.state.app.filter!=='fixed' ? '10px' : '76px'}" class="main-content">
      <iw-filter
        :id="$store.state.app.filter!=='fixed'?'overview-analyse':''"
        :show="{market: true, dataTimeType: true, dimensionType: true, subModel: true}"
        :multiple="{segment: true, manfBrand: true, subModel: true}"
        :data-time-range="true"
        @change="changeDataForm"
      />
    </div>
  </div>
</template>

<script>
import IwBanner from '@/components/banner/index'
import IwFilter from '@/components/filter/index'
export default {
  components: {
    IwBanner,
    IwFilter
  },
  data() {
    return {
      filterForm: {}
    }
  },
  methods: {
    changeDataForm(form) {
      console.log(form)
      this.filterForm = { ...this.filterForm, ...form }
    }
  }
}
</script>
