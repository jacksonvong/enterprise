<template>
  <div class="reward-category-detail">
    <div>
      <table>
        <tbody>
          <tr>
            <th>{{ data.model }}</th>
            <th>{{ data.cycle }}</th>
            <th>{{ data.rewardType }}</th>
            <th>{{ data.rewardSubType }}</th>
            <th>{{ data.rewardName }}</th>
            <th v-for="(name, index) in data.months" :key="index">
              {{ name }}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="scroll">
      <table v-for="(subModel, index) in data.subModelList" :key="index">
        <tbody>
          <tr>
            <td id="tdModel" :style="tdModelWidth" :colspan="subModel.cycleList.length">
              <div>
                <img class="image" :src="subModel.logoUrl">
                <div class="model">
                  {{ subModel.subModel }}
                </div>
                <div class="tag">
                  {{ 'MSRP' }}
                </div>
                <div>{{ subModel.msrp }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  // 奖励项分类明细
  name: 'IwRewardCategoryDetail',
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
      tdModelWidth: {}
    }
  },
  created() {
    console.log('data', this.data)
  },
  mounted() {
    this.listenResize()
  },
  updated() {
    this.listenResize()
  },
  methods: {
    listenResize() {
      this.tdModelWidth = { width: $('#tdModel').outerWidth(true) + 'px' }
      console.log('#tdModel', this.tdModelWidth)
    }
  }
}
</script>

<style lang="less" scoped>
.reward-category-detail {
  .image {
    width: 60%;
    max-width: 120px;
  }
}
</style>
