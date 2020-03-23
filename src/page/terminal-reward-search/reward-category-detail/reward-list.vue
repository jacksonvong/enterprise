<template>
  <table class="reward-name-table">
    <tr v-for="(reward, rewardNameIndex) in data" :key="rewardNameIndex" class="border-bottom">
      <td
        id="rewardName"
        :style="{
          ...styles.rewardNameWidth,
          height: styles.lastTdHeight,
          backgroundColor: styles.backgroundColor
        }"
        class="border-right min-width-name">
        {{ reward.rewardName }}
      </td>
      <td
        v-for="(month, monthIndex) in reward.months"
        id="firstPolicy"
        :key="monthIndex"
        :style="{
          ...styles.firstPolicyWidth,
          backgroundColor: styles.backgroundColor
        }"
        class="border-right min-width-value">
        <template v-if="reward.showDetail">
          <iw-detail-cell :data="month" />
        </template>
        <template v-else>
          {{ month }}
        </template>
      </td>
    </tr>
  </table>
</template>

<script>
import IwDetailCell from './detail-cell'
export default {
  name: 'IwRewardList',
  components: {
    IwDetailCell
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
  }
}
</script>

<style lang="less" scoped>
.reward-name-table {
  td:last-child {
    border-right: 0;
  }
  tr:last-child {
    border-bottom: 0;
  }
}
</style>
