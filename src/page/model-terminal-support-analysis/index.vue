<template>
  <div class="model-terminal-support-analysis">
    <iw-banner :title="$t('modelOverview.banner.title')" />
    <div :style="{'padding-top': $store.state.app.filter!=='fixed' ? '10px' : '76px'}" class="main-content">
      <iw-banner-filter
        :id="$store.state.app.filter!=='fixed'?'overview-analyse':''"
        :show="{dataSource: true, subModel: true}"
        :multiple="{subModel: true}"
        @change="changeDataForm"
      />
    </div>
  </div>
</template>

<script>
import IwBanner from '@/components/banner/index'
import IwBannerFilter from '@/components/banner/filter'
export default {
  components: {
    IwBanner,
    IwBannerFilter
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
