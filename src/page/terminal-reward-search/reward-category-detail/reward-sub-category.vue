<template>
  <table class="reward-sub-categroy-table">
    <tr v-for="(rewardSubClass, rewardSubClassIndex) in data" :key="rewardSubClassIndex" :class="[rewardSubClassIndex === data.length - 1 ? '' : 'border-bottom']">
      <td
        id="rewardSubClass"
        :style="{
          ...styles.rewardSubClassWidth,
          borderRightColor: styles.borderRightColor,
          backgroundColor: styles.backgroundColor
        }"
        class="border-right min-width-name">
        {{ rewardSubClass.rewardSubTypeName }}
      </td>
      <td class="border-none">
        <IwRewardList :data="rewardSubClass.rewardList" :styles="styles" />
      </td>
    </tr>
  </table>
</template>

<script>
import IwRewardList from './reward-list'
export default {
  name: 'IwRewardSubCategory',
  components: {
    IwRewardList
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
        return { borderRightColor: 'transparent' }
      }
      return {}
    }
  }
}
</script>
