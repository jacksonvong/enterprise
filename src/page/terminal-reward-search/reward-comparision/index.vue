<template>
  <div class="reward-comparision">
    <div class="mask-header-container">
      <div ref="tableHeaderRef" class="table-header">
        <table class="reward-table">
          <tbody>
            <tr>
              <th class="width-1" :style="tdModelWidth">
                {{ rewardComparisonList.model }}
              </th>
              <th v-for="(title, index) in rewardComparisonList.titles" :key="index" class="width-3" :style="width3Style">
                {{ title }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="rewardComparisonList.titles&&rewardComparisonList.titles.length > 3" class="mask-header">
        <table class="reward-table" :style="{width: tableWidth}">
          <tbody>
            <tr>
              <th class="width-1" :style="tdModelWidth">
                {{ rewardComparisonList.model }}
              </th>
              <th v-for="(title, index) in rewardComparisonList.titles" :key="index" class="width-3" :style="width3Style">
                {{ title }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mask-header-container">
      <div id="tableListRef" class="table-list" :style="{ maxHeight, overflowX: 'auto', overflowY: 'scroll' }" @scroll="handleScroll">
        <table
          v-for="(subModel, rewardIndex) in rewardComparisonList.incentContent"
          :id="`tikeyc-${rewardIndex}`"
          :key="rewardIndex"
          class="reward-table">
          <tbody>
            <tr class="model-tr" :style="{height: 0}">
              <td id="tdModel" class="td-model width-1" :style="tdModelWidth" :rowspan="subModel.policyContent&&subModel.policyContent.length+1">
                <div class="model-container" :style="{height: modelContainerHeights[`tikeyc-${rewardIndex}`] || 'auto' }">
                  <div class="content">
                    <img class="image" :src="subModel.logoUrl">
                    <div class="model">
                      {{ subModel.subModel }}
                    </div>
                    <div class="tag">
                      {{ subModel.tag }}
                    </div>
                    <div>{{ subModel.price }}</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-for="(incentive, incentiveIndex) in subModel.policyContent" :key="incentiveIndex">
              <td
                v-for="(item, index) in incentive.item"
                :key="index"
                :style="width3Style"
                class="width-3">
                <div v-if="subModel.policyContent" class="td-container" :style="subModel.policyContent.length <= 5 ? { minHeight: 180 / subModel.policyContent.length } : {}">
                  <div v-if="item">
                    <div key="1" v-html="item.subType" />,
                    <template v-if="item.policy&&item.policy.length>0">
                      ：
                    </template>
                    <div key="2" v-html="item.policy" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="rewardComparisonList.titles&&rewardComparisonList.titles.length > 3" ref="tableMaskListRef" class="table-list mask-list" :style="{ maxHeight, bottom: maskListBottom }">
        <table
          v-for="(subModel, rewardIndex) in rewardComparisonList.incentContent"
          :id="`tikeyc-${rewardIndex}`"
          :key="rewardIndex"
          class="reward-table">
          <tbody>
            <tr class="model-tr" :style="{height: 0}">
              <td id="tdModel" class="td-model width-1" :style="tdModelWidth" :rowspan="subModel.policyContent&&subModel.policyContent.length+1">
                <div class="model-container" :style="{height: modelContainerHeights[`tikeyc-${rewardIndex}`] || 'auto' }">
                  <div class="content">
                    <img class="image" :src="subModel.logoUrl">
                    <div class="model">
                      {{ subModel.subModel }}
                    </div>
                    <div class="tag">
                      {{ subModel.tag }}
                    </div>
                    <div>{{ subModel.price }}</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-for="(incentive, incentiveIndex) in subModel.policyContent" :key="incentiveIndex">
              <td
                v-for="(item, index) in incentive.item"
                :key="index"
                :style="width3Style"
                class="width-3">
                <div v-if="subModel.policyContent" class="td-container" :style="subModel.policyContent.length <= 5 ? { minHeight: 180 / subModel.policyContent.length } : {}">
                  <div v-if="item">
                    <div key="1" v-html="item.subType" />,
                    <template v-if="item.policy&&item.policy.length>0">
                      ：
                    </template>
                    <div key="2" v-html="item.policy" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  // 奖励项分类明细
  name: 'IwRewardComparision',
  props: {
    data: {
      type: Object,
      default() {
        return {
        }
      }
    }
  },
  data() {
    return {
      rewardComparisonList: this.data,
      tdModelWidth: {},
      width3Style: {},
      modelContainerHeights: {},
      tableWidth: 0,
      maskListBottom: 0,
      maxHeight: '200px'
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
        this.rewardComparisonList = { ...this.data }
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
      this.maskListBottom = 17 + 'px'
      this.width3Style = {}
      if (this.rewardComparisonList.titles && this.rewardComparisonList.titles.length < 3) {
        this.width3Style = { width: 'auto' }
      }
      this.rewardComparisonList.incentContent && this.rewardComparisonList.incentContent.forEach((element, index) => {
        const heightValue = $(`#tikeyc-${index}`).height()
        const heightObj = {}
        heightObj[`tikeyc-${index}`] = heightValue + 'px'
        this.modelContainerHeights = {
          ...this.modelContainerHeights,
          ...heightObj
        }
      })
    },
    listenResize(arg, noRezize) {
      if (!noRezize) {
        setTimeout(() => {
          setTimeout(() => {
          }, 50)
        }, 50)
      }
      this.tableWidth = $('#tableListRef').width() + 'px'
      this.tdModelWidth = { width: $('#tdModel').outerWidth(true) + 'px' }
      this.maxHeight = window.innerHeight - $('#tableListRef').offset().top - 14 + 'px'
    },
    handleScroll(event) {
      console.log(event.target.scrollLeft, event.target.scrollTop)
      if (this.$refs.tableHeaderRef) {
        this.$refs.tableHeaderRef.scrollLeft = event.target.scrollLeft
      }
      if (this.$refs.tableMaskListRef) {
        this.$refs.tableMaskListRef.scrollTop = event.target.scrollTop
      }
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
.reward-comparision {
  font-size: 14px;
  .table-header {
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .reward-table {
    .width-1 {
      min-width: 230px;
    }
    .width-3 {
      width: 28%;
      min-width: 260px;
    }
    .model-tr {
      position: relative;
      height: 0;
    }
    .td-model {
      position: relative;
      border-bottom: 1px solid #eee;
      .model-container {
        display: flex;
        justify-content: center;
        align-items: center;
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
    .td-container {
      padding: 10px;
      position: relative;
      div {
        display: inline-block;
        vertical-align: top;
      }
    }
    th, td {
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }
    tr {
      height: 40px;
      font-size: 14px;
      text-align: left;
      th {
        height: 40px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        background: #FAFAFA;
        color: #848997;
        font-size: 12px;
        font-weight: normal;
        text-align: center;
        white-space: nowrap;
      }
      td {
        font-size: 12px;
        min-height: 40px;
        vertical-align: top;
      }
    }
  }
  .mask-header-container {
    position: relative;
  }
  .mask-header {
    overflow: hidden;
    width: 230px;
    border-right: 1px solid #fff;
    position: absolute;
    left: 0;
    top: 0;
  }
  .table-list {
    position: relative;
    background-color: #fff;
  }
  .mask-list {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    width: 231px;
    bottom: 17px;
    border-right: 1px solid #eee;
  }
}
</style>
