<template>
  <div class="custom-stack-bar">
    <div class="title">
      {{ data.name }}
    </div>
    <div v-if="data.id" class="bar-wrapper">
      <div class="total">
        <div class="name-item">
          MSPR
        </div>
        <div class="number-item">
          {{ data.msrp }}
        </div>
      </div>
      <div class="height-box">
        <div class="item-wrapper" :style="getHeight(data.discount)">
          <div class="name-item">
            <!-- {{ data.discountName }} -->
            {{ $t('modelTerminalSupportAnalysis.profit.discount') }}
          </div>
          <div class="number-item" :style="{background: color[0]}">
            {{ data.discount }}
          </div>
        </div>
        <div class="item-wrapper" :style="getHeight(data.saleProfit,)">
          <div class="name-item">
            <!-- {{ data.saleProfitName }} -->
            {{ $t('modelTerminalSupportAnalysis.profit.salesProfit') }}
          </div>
          <div class="number-item" :style="{background: color[1]}">
            {{ data.saleProfit }}
          </div>
        </div>
        <div class="item-wrapper" :style="getHeight(data.cost)">
          <div class="name-item">
            <!--{{ data.costName }}-->
            {{ $t('modelTerminalSupportAnalysis.profit.cost') }}
          </div>
          <div class="number-item" :style="{background: color[2]}">
            {{ data.cost }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="tip-wrapper">
      {{ data.tip }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      color: ['#80dd80', '#fbad57', '#6398f5']
    }
  },
  methods: {
    getHeight(number) {
      number = Number(number.replace(',', ''))
      const discount = Number(this.data.discount.replace(',', ''))
      const saleProfit = Number(this.data.saleProfit.replace(',', ''))
      const cost = Number(this.data.cost.replace(',', ''))

      return {
        height: (number / (discount + saleProfit + cost) * 100).toFixed(1) + '%'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .custom-stack-bar {

    box-shadow: 0 0 10px lighten(black, 80%);
    padding: 34px 32px 14px;
    .title {
      text-align: center;
      font-size: 16px;
      color: #242A37;
      margin-bottom: 21px;
    }
    .bar-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .total {
        display: flex;

        .number-item {
          color: black;
        }
      }

      .name-item {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        line-height: 30px;
        font-size: 14px;
        width: 80px;
        padding-right: 10px;
      }
      .number-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 84px;
        font-size: 14px;
        color: white;
      }

      .height-box{
        height: 280px;
        .item-wrapper{
          display: flex;
        }
      }

    }
    .tip-wrapper {
      text-align: center;
    }

  }
</style>
