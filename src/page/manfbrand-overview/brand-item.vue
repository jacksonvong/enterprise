<template>
  <li class="brand-item">
    <div class="image">
      <img :src="item.image" :alt="item.name" class="logo">
    </div>
    <div class="title">
      {{ item.name }}
      <a-icon title="置顶" type="to-top" @click="JumpToTop(item)" />
    </div>
    <div class="content">
      <div class="content-item">
        <span>3月</span><span>总激励/环比：</span>
        <span class="value"><span>{{ item.totalExcitationValue }}</span><span>/</span></span><span :class="getClass(item.totalMoMValue)">{{ item.totalMoMValue }}</span>
      </div>
      <div class="content-item">
        <span>3月</span><span>月度激励/环比：</span>
        <span class="value"><span>{{ item.monthExcitation }}</span><span>/</span></span><span :class="getClass(item.monthMoMValue)">{{ item.monthMoMValue }}</span>
      </div>
      <div class="content-item">
        <span>3月</span><span>利润/环比：</span>
        <span class="value"><span>{{ item.profit }}</span><span>/</span></span><span :class="getClass(item.profitMoMValue)">{{ item.profitMoMValue }}</span>
      </div>
      <div class="content-item">
        <span>{{ item.salesMonth }}</span><span>销量(台)/同比：</span>
        <span class="value"><span>{{ item.sales }}</span><span>/</span></span><span :class="getClass(item.salesYoYValue)">{{ item.salesYoYValue }}</span>
      </div>
    </div>
    <div class="close" @click="handleRemoveItem(item)">
      <a-icon type="close" />
    </div>
  </li>
</template>

<script>
import { Icon } from 'ant-design-vue'
export default {
  name: 'IwBrandItem',
  components: {
    AIcon: Icon
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleRemoveItem(item) {
      console.log(item)
      this.$emit('remove', item, item.manfBrandId)
    },
    JumpToTop(item) {
      this.$emit('toTop', item)
    },
    getClass(item) {
      if (item === '' || item === '-' || item === '0' || item === '0.0%') return 'font-black'
      return item.indexOf('-') === 0 ? 'font-red' : 'font-green'
    }
  }
}
</script>

<style lang="less" scoped>
.brand-item {
  padding: 15px;
  width: 250px;
  height: 260px;
  text-align: center;
  position: relative;
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 8px 2px rgba(80,138,238,.2);
    .close {
      position: absolute;
      top: -22px;
      right: -22px;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      color: #fff;
      background: #b2b2b2;
      cursor: pointer;
      display: block;
      &:hover {
        background: #8e8e8e;
      }
      i {
        top: 24px;
        right: 24px;
        position: absolute;
      }
    }
  }
  .image {
    img {
      height: 70px;
      width: auto;
      max-width: 220px;
    }
  }
  .title {
    font-weight: 700;
    font-size: 18px;
    i {
      cursor: pointer;
      &:hover {
        color: #2e5aa6;
      }
    }
  }
  .content {
    text-align: left;
    color: #999;
    margin-top: 10px;
    .content-item {
      line-height: 28px;
    }
    .value {
      color: #000;
    }
  }
  .close {
    display: none;
  }
}
</style>
