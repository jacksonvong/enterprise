<template>
  <a-modal
    :visible="visible"
    width="468px"
    :body-style="{padding: '0px'}"
    :footer="null"
    :title="null"
    closable
    @close="close"
    @cancel="close"
  >
    <div class="iw-permission-tips">
      <a-spin :spinning="spinning">
        <div class="iw-permission-tips-title">
          <span>提示</span>
        </div>
        <div class="iw-permission-tips-main">
          <p>
            尊敬的用户 ：您暂无WAYS【{{ system.title }}】系统权限，请联系WAYS客户中心，或者申请试用。
          </p>
          <dl>
            <dt>
              <a-icon type="phone" />
              WAYS客户中心：
            </dt>
            <dd>
              <cite>电话</cite><br>
              020 - 83912326 - 8249
            </dd>
            <dd>
              <span>
                <cite>手机</cite><br>
                188 1411 8557
              </span>
              <span>
                <cite>邮箱</cite><br>
                cs@way-s.cn
              </span>
            </dd>
          </dl>
        </div>
        <div class="iw-permission-tips-footer">
          <a-button size="small" type="primary" @click="handleApply()">
            申请试用
          </a-button>
        </div>
      </a-spin>
    </div>
  </a-modal>
</template>
<script>
import { Modal, Button, Icon, message, Spin } from 'ant-design-vue'
import { getApplyForTrial, getApplyUserInfo } from '@/api/index'
import { truncate } from 'fs'
export default {
  name: '',
  components: {
    AModal: Modal,
    AIcon: Icon,
    AButton: Button,
    ASpin: Spin
  },
  props: {
    value: {
      type: Boolean,
      default() {
        return false
      }
    },
    system: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      visible: this.value,
      spinning: false,
      userInfo: {}
    }
  },
  watch: {
    value() {
      this.visible = this.value
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
      this.$emit('close', false)
    },
    async handleApply() {
      const _this = this
      _this.spinning = truncate
      await _this.getApplyUserInfo()
      const user = _this.userInfo

      return new Promise((resolve, reject) => {
        getApplyForTrial({
          productId: _this.system.id,
          userName: user.user_name || '',
          userId: user.user_id || '',
          companyName: user.company_name || '',
          department: user.department_name || '',
          phone: user.phone || '',
          mail: user.mail || ''
        })
          .then(response => {
            if (response.data[0]) {
              message.success('提交成功')
            } else {
              message.error(response.result_msg)
            }
            _this.spinning = false
            _this.close()
            resolve(response)
          })
          .catch(error => {
            _this.spinning = false
            _this.status = '500'
            reject(error)
          })
      })
    },
    getApplyUserInfo() {
      const _this = this
      return new Promise((resolve, reject) => {
        getApplyUserInfo()
          .then(response => {
            const user = response.data[0] || {}
            _this.userInfo = user
            resolve(user)
          })
          .catch(error => {
            _this.spinning = false
            reject(error)
          })
      })
    }
  }
}
</script>
<style lang="less" scoped>
@iw-permission-tips-padding: 20px;
@iw-permission-tips-border-color: #f2f2f3;
.iw-permission-tips {
  width: 468px;
  min-width: 460px;
}
.iw-permission-tips-title {
  min-width: 177px;
  min-height: 26px;
  margin: 0;
  padding: 15px @iw-permission-tips-padding;
  font-size: 16px;
  color: #1a1b30;
  font-weight: 500;
  line-height: 26px;
  border-bottom: 1px solid @iw-permission-tips-border-color;
}
.iw-permission-tips-title-close {
  display: block;
  float: right;
  width: auto;
  height: 100%;
  color: #aaacb7;
  text-align: center;
  margin-left: @iw-permission-tips-padding;
  cursor: pointer;
}
.iw-permission-tips-main {
  padding: 30px 28px;
  border-bottom: 1px solid @iw-permission-tips-border-color;
  p {
    font-size: 14px;
    color: #181c2b;
    line-height: 22px;
    margin-bottom: 30px;
  }
  dl {
    text-align: left;
  }
  dt {
    margin-bottom: 10px;
    font-size: 12px;
    color: #80859a;
    i { font-size: 16px; margin-right: 6px;}
  }
  dd {
    font-size: 15px;
    color: #3a3a3a;
    line-height: 22px;
    margin-top: 10px;
    &:before,
    &:after {
      content: "";
      display: table;
    }
    &:after {
      clear: both;
    }
  }
  cite {
    color: #80859a;
    font-size: 12px;
  }
  span {
    display: block;
    float: left;
    margin-right: 40px;
  }
}
.iw-permission-tips-footer {
  padding: 15px 20px;
  text-align: center;
  .ant-btn { margin-left: 5px; padding: 0 20px;}
}
</style>
