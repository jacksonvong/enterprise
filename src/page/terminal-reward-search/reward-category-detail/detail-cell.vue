<template>
  <iw-popover placement="bottom-end" show-arrow popper-class="iw-popover-detail-table" :body-style="{padding: '10px'}" :width="null">
    <div slot="reference" class="show-detail">
      详细
    </div>
    <div class="iw-detail-table-container">
      <table class="iw-detail-table">
        <tbody>
          <tr v-for="(reward, index) in data" :key="index">
            <td>{{ reward.rewardTypeName }}</td>
            <td>{{ reward.rewardSubTypeName }}</td>
            <td>{{ reward.rewardName }}</td>
            <td>{{ reward.rewardCycle }}</td>
            <td v-for="(month, monthIndex) in reward.months" :key="monthIndex">
              {{ month }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </iw-popover>
</template>

<script>
export default {
  name: 'IwDetailCell',
  props: {
    data: {
      type: Array,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .show-detail {
    color: #2E5AA6;
    padding: 4px 8px;
    cursor: pointer;
  }
  .iw-detail-table {
    font-size: 12px;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    th, td {
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 6px 8px;
    }
  }
</style>
