<template>
  <table class="reward-categroy-table">
    <tr v-for="(rewardCategory, rewardCategoryIndex) in data" :key="rewardCategoryIndex">
      <td
        id="rewardCategory"
        :style="{
          ...styles.rewardCategoryWidth,
          ...createStyle(rewardCategory)
        }"
        class="border-right border-bottom min-width-name">
        <template v-if="rewardCategory.total">
          <div class="total-div">
            {{ rewardCategory.rewardTypeName }}
          </div>
        </template>
        <template v-else>
          {{ rewardCategory.rewardTypeName }}
        </template>
      </td>
      <td class="border-bottom">
        <IwRewardSubCategory :data="rewardCategory.subClassList" :styles="{...styles, ...createStyle(rewardCategory)}" />
      </td>
    </tr>
  </table>
</template>

<script>
import IwRewardSubCategory from './reward-sub-category'
export default {
  name: 'IwRewardCategory',
  components: {
    IwRewardSubCategory
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    styles: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    createStyle(rewardCategory) {
      if (rewardCategory.total) {
        return {
          borderRightColor: 'transparent',
          backgroundColor: '#F8F8FC'
        }
      }
      return {}
    }
  }
}
</script>

<style lang="less" scoped>
.reward-categroy-table {
  .total-div {
    position: absolute;
    transform: translateY(-50%);
  }
}
</style>
