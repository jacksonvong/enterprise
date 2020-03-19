<template>
  <div class="banner-box">
    <div class="banner">
      <div class="banner-left">
        <h2>{{ title }}</h2>
        <div class="expand">
          <slot name="left" />
        </div>
      </div>
      <div class="banner-right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IwBanner',
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  data() {
    return {}
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/style/mixins";
@height: 48px;
.banner-box {
  width: 100%;
  height: @height;
  margin: 65px 0 0;
}
.in-frame {
  .banner-box {
    margin: 0;
    .banner {
      top: 0;
      left: 0;
    }
  }
}
.leftmenu-expand {
  .banner {
    left: 200px;
  }
}
.banner {
  .position(64px, 0, 0, 0, fixed);
  .clearfix();
  height: @height;
  padding: 12px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  z-index: 990;
}
.banner-left {
  float: left;
  max-width: 70%;
  .clearfix();
  h2 {
    .font-adjust(20px, 26px, @text-color, left, bold);
    float: left;
    position: relative;
    padding-right: 12px;
    margin-right: 12px;
    white-space: nowrap;
    &:after {
      .position(0, 0, 0, absolute);
      content: "";
      width: 1px;
      background-color: #e9e9e9;
    }
  }
  .expand {
    float: left;
  }
}
.banner-right {
  float: right;
  max-width: 350px;
  .text-hide();
}
</style>
<style lang="less">
.banner {
  @media (max-width: 1350px) {
    .ant-breadcrumb { display: none; }
    .banner-left { max-width: 100%; }
  }
}
</style>

