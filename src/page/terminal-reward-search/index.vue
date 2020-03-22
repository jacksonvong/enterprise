<template>
  <div class="terminal-reward-search">
    <iw-banner :title="$t('modelOverview.banner.title')" />
    <div :style="{'padding-top': $store.state.app.filter!=='fixed' ? '10px' : '76px'}" class="main-content">
      <iw-filter
        :id="$store.state.app.filter!=='fixed'?'overview-analyse':''"
        :show="{dataTimeType: true, dimensionType: true, subModel: true, reward: true}"
        :multiple="{segment: true, manfBrand: true, subModel: true}"
        :data-time-range="true"
        @change="changeDataForm"
      />
      <a-card>
        <IwRewardCategoryDetail :data="rewardCategoryDetail.data" />
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwFilter from '@/components/filter/index'
import IwRewardCategoryDetail from './reward-category-detail/index' // 奖励项分类明细
import { getTypeInfo } from '@/api/terminal-reward-search'
export default {
  components: {
    IwBanner,
    IwFilter,
    IwRewardCategoryDetail,
    ACard: Card
  },
  data() {
    return {
      filterForm: {},
      rewardCategoryDetail: {
        data: {}
      }
    }
  },
  created() {
    this.getTypeInfo()
  },
  methods: {
    changeDataForm(form) {
      console.log(form)
      this.filterForm = { ...this.filterForm, ...form }
    },
    getTypeInfo() {
      return new Promise((resolve, reject) => {
        getTypeInfo({
        }).then(res => {
          console.log(res)
          const data = res.data || []
          this.rewardCategoryDetail.data = data[0] || {}
          resolve(res)
        })
      })
    }
  }
}
</script>
