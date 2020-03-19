<template>
  <div class="error-page-bg" :style="{height: height}">
    <div class="error-page-text">
      <p>尊敬的用户：</p>
      <p>销量全景综合分析，因出现系统故障，影响正常使用，当前正在紧急维护中，请稍后重试，感谢您的支持！</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <p class="right">
        IWAYS信息团队
      </p>
      <p class="right">
        {{ moment('YYYY-MM-DD') }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Error404',
  data() {
    return {
      height: document.documentElement.clientHeight - 65 + 'px'
    }
  },
  methods: {
    moment(value) {
      return moment().format(value)
    }
  }
}
</script>

<style lang="less" scope>
.error-page-bg {
  background: url("~@/assets/images/404/bg.png") center center;
  background-repeat: no-repeat;
  background-size: contain;
  .error-page-text {
    color: #333;
    font-size: 16px;
    display: block;
    width: 48%;
    position: absolute;
    top: 76%;
    left: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 1px;
    p {
      line-height: 30px;
    }
    .right {
      text-align: right;
    }
  }
}
</style>

