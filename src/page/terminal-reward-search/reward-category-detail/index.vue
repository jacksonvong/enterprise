<template>
  <div class="reward-category-detail">
    <table class="reward-table-header reward-table">
      <tbody>
        <tr>
          <th :style="tdModelWidth" class="min-width-model">
            {{ rewardDetailList.model }}
          </th>
          <th :style="fileTypeWidth" class="min-width-file-type">
            {{ rewardDetailList.cycle }}
          </th>
          <th :style="{ width: (rewardCategoryWidth.width ? parseInt(rewardCategoryWidth.width) + gap : 0) + 'px' }" class="min-width-name">
            {{ rewardDetailList.rewardType }}
          </th>
          <th :style="{ width: (rewardSubClassWidth.width ? parseInt(rewardSubClassWidth.width) + gap : 0) + 'px' }" class="min-width-name">
            {{ rewardDetailList.rewardSubType }}
          </th>
          <th :style="{ width: (rewardNameWidth.width ? parseInt(rewardNameWidth.width) + gap : 0) + 'px' }" class="min-width-name">
            {{ rewardDetailList.rewardName }}
          </th>
          <th v-for="(name, index) in rewardDetailList.months" :key="index" :style="firstPolicyWidth">
            {{ name }}
          </th>
        </tr>
      </tbody>
    </table>
    <iw-scrollbar id="tableListRef" :wrap-style="'height:'+(maxHeight+16)+'px;'" keep-show>
      <table v-for="(subModel, subModelIndex) in rewardDetailList.subModelList" :key="subModelIndex" class="reward-table">
        <tbody>
          <tr class="model-tr">
            <td id="tdModel" :style="tdModelWidth" :rowspan="subModel.cycleList.length+1" class="td-model border-right border-bottom min-width-model">
              <div class="model-container">
                <div class="content">
                  <img class="image" :src="subModel.logoUrl">
                  <div class="model">
                    {{ subModel.subModel }}
                  </div>
                  <div class="tag">
                    {{ 'MSRP' }}
                  </div>
                  <div class="price">
                    {{ subModel.msrp }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-for="(fileType, fileTypeIndex) in subModel.cycleList" :key="fileTypeIndex">
            <td id="fileType" :style="fileTypeWidth" class="border-right border-bottom min-width-file-type">
              {{ fileType.cycleName }}
            </td>
            <td class="border-none">
              <IwRewardCategory :data="fileType.typeList" :styles="{rewardCategoryWidth, rewardSubClassWidth, rewardNameWidth, firstPolicyWidth, totalWidth, lastTdHeight: subModel.lastTdHeight}" />
            </td>
          </tr>
        </tbody>
      </table>
    </iw-scrollbar>
  </div>
</template>

<script>
import $ from 'jquery'
import IwRewardCategory from './reward-category'
export default {
  // 奖励项分类明细
  name: 'IwRewardCategoryDetail',
  components: {
    IwRewardCategory
  },
  props: {
    data: {
      type: Object,
      default() {
        return {
        }
      }
    },
    limitHeight: {
      type: [Number, Boolean],
      default() {
        return false
      }
    }
  },
  data() {
    return {
      rewardDetailList: this.data,
      fileTypeWidth: {},
      tdModelWidth: {},
      rewardCategoryWidth: {},
      categoryWidth: 0,
      rewardSubClassWidth: {},
      subClassWidth: 0,
      rewardNameWidth: {},
      nameWidth: 0,
      firstPolicyWidth: {},
      gap: 1,
      totalWidth: {},
      maxHeight: 200
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar.opened
    }
  },
  watch: {
    data: {
      handler() {
        this.rewardDetailList = { ...this.data }
        setTimeout(() => {
          this.listenResize()
          this.init()
        }, 100)
      },
      deep: true
    },
    sidebar(newVal, oldVal) {
      this.listenResize()
    }
  },
  mounted() {
    $(window).on('resize', this.listenResize)
    this.listenResize(false, false)
    this.init()
  },
  destroyed() {
    $(window).off('resize', this.listenResize)
  },
  methods: {
    init() {
      const totalWidth = {
        width: this.categoryWidth + this.subClassWidth + this.nameWidth + 'px'
      }
      this.totalWidth = totalWidth
      if (this.rewardDetailList && this.rewardDetailList.subModelList) {
        this.rewardDetailList = {
          ...this.rewardDetailList,
          subModelList: this.rewardDetailList.subModelList.map(item => ({
            ...item,
            lastTdHeight: this.getLastTdHeight(item, this.tdModelHeight)
          }))
        }
      }
    },
    listenResize(arg, noRezize) {
      if (!noRezize) {
        setTimeout(() => {
          setTimeout(() => {
          }, 50)
        }, 50)
      }
      this.tdModelWidth = { width: $('#tdModel').outerWidth(true) + 'px' }
      this.fileTypeWidth = { width: $('#fileType').outerWidth(true) + 'px' }
      this.categoryWidth = $('#rewardCategory').outerWidth(true)
      this.subClassWidth = $('#rewardSubClass').outerWidth(true)
      this.nameWidth = $('#rewardName').outerWidth(true)
      this.rewardCategoryWidth = { width: this.categoryWidth + 'px' }
      this.rewardSubClassWidth = { width: this.subClassWidth + 'px' }
      this.rewardNameWidth = { width: this.nameWidth + 'px' }
      this.firstPolicyWidth = { width: $('#firstPolicy').outerWidth(true) + 'px' }
      // 添加了 limitHeight 属性可以自定义高度
      this.maxHeight = typeof this.limitHeight === 'number' ? this.limitHeight : window.innerHeight - $('#tableListRef').offset().top - 14
    },
    getLastTdHeight(item, tdModelHeight) {
      let lastTdHeight = tdModelHeight / (item.itemNum + item.cycleList.length)
      if (lastTdHeight > 90) {
        lastTdHeight = 90
      }
      const defaultHeight = 40
      return (item.itemNum < 3 ? lastTdHeight : defaultHeight) + 'px'
    }
  }
}
</script>

<style lang="less">
.reward-category-detail {
  .reward-table-header {
    border-top: 1px solid #eee;
  }
  .reward-table {
    .min-width-model {
      width: 200px;
      min-width: 160px;
    }
    .min-width-file-type {
      width: 70px;
      min-width: 70px;
    }
    .min-width-name {
      width: 100px;
      min-width: 90px;
    }
    .min-width-value {
      width: 100px;
      min-width: 90px;
    }
    .td-model {
      .model-container {
        .content {
          text-align: center;
          font-size: 16px;
          .image {
            max-width: 120px;
          }
          .model {
            font-size: 12px;
            line-height: 20px;
          }
          .tag {
            font-size: 14px;
            line-height: 20px;
            color: #888;
          }
          .price {
            line-height: 24px;
          }
        }
      }
    }
    tr {
      text-align: center;
      td {
        font-size: 12px;
        text-overflow: ellipsis;
      }
    }
  }
  th {
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background: #FAFAFA;
    color: #848997;
    font-size: 12px;
    font-weight: normal;
    height: 40px;
    &:last-child {
      border-right-color: #FAFAFA;
    }
  }
  .image {
    width: 60%;
    max-width: 120px;
  }
  .model-tr {
    position: relative;
    height: 0;
  }
}
</style>
