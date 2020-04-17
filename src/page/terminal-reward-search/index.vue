<template>
  <div class="terminal-reward-search">
    <iw-banner :title="$t('modelOverview.banner.title')" />
    <div :style="{'padding-top': $store.state.app.filter!=='fixed' ? '10px' : '94px'}" class="main-content">
      <iw-filter
        :id="$store.state.app.filter!=='fixed'?'overview-analyse':''"
        :show="{dataTimeType: true, dimension: true, subModel: true, reward: true}"
        :multiple="{segment: true, manfBrand: true, subModel: true}"
        :data-time-range="true"
        @change="changeDataForm"
      />
      <a-card
        :tab-list="tabListTitle"
        :active-tab-key="titleKey"
        class="ant-card-shortline"
        :head-style="{padding: 0}"
        :body-style="{padding: 0}"
        @tabChange="key => onTabChange(key)"
      >
        <IwRewardComparision v-if="titleKey=='1'" :data="rewardComparision.data" />
        <IwRewardCategoryDetail v-if="titleKey=='2'" :data="rewardCategoryDetail.data" />
      </a-card>
    </div>
  </div>
</template>

<script>
import { Card } from 'ant-design-vue'
import IwBanner from '@/components/banner/index'
import IwFilter from '@/components/filter/index'
import IwRewardComparision from './reward-comparision/index' // 奖励项对比
import IwRewardCategoryDetail from './reward-category-detail/index' // 奖励项分类明细
import { getTimeInfo, getTypeInfo } from '@/api/terminal-reward-search'
export default {
  components: {
    IwBanner,
    IwFilter,
    IwRewardComparision,
    IwRewardCategoryDetail,
    ACard: Card
  },
  data() {
    return {
      titleKey: '1',
      tabListTitle: [
        {
          key: '1',
          tab: this.$t('奖励项对比')
        },
        {
          key: '2',
          tab: this.$t('奖励项分类明细')
        }
      ],
      dataForm: {},
      rewardComparision: {
        data: {}
      },
      rewardCategoryDetail: {
        data: {}
      }
    }
  },
  watch: {
    dataForm: {
      handler() {
        if (this.dataForm.dataTime) {
          this.getData()
        }
      }
    }
  },
  created() {
    if (this.dataForm.dataTime) {
      this.getData()
    }
  },
  methods: {
    onTabChange(value) {
      this.titleKey = value
    },
    changeDataForm(form) {
      this.dataForm = { ...this.dataForm, ...form }
    },
    getData() {
      this.getTimeInfo()
      this.getTypeInfo()
    },
    getTimeInfo() {
      return new Promise((resolve, reject) => {
        getTimeInfo({
        }).then(res => {
          const data = res.data || []
          this.rewardComparision.data = data[0] || {}
          resolve(res)
        })
      })
    },
    getTypeInfo() {
      return new Promise((resolve, reject) => {
        getTypeInfo({
        }).then(res => {
          const data = res.data || []
          this.rewardCategoryDetail.data = data[0] || {}
          resolve(res)
        })
      })
    }
  }
}
</script>
