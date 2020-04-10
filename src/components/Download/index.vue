<template>
  <span class="iw-download">
    <template v-if="type === 'complex'">
      <a-popover
        v-model="visible"
        title=""
        trigger="click"
        placement="left"
        :get-popup-container="element => element.parentNode"
      >
        <div slot="content">
          <div class="loadtype">
            <span :class="{disabled: !dataAuth}" @click="checkAuth()">数据下载</span>
            <span :class="{disabled: !chartAuth}" @click="downloadChart()">图表下载</span>
          </div>
        </div>
        <a-icon type="download" />
      </a-popover>
    </template>

    <template v-else>
      <a-icon :class="{disabled: !dataAuth}" type="download" @click="checkAuth()" />
    </template>
  </span>
</template>
<script>
import { Popover, notification, Icon } from 'ant-design-vue'
import html2canvas from 'html2canvas'
import { getToken } from '@/utils/auth'
import { queryEncoded, submitForm } from '@/utils/helper'
import request from '@/utils/request'
import $ from 'jquery'
import canvg from 'canvg'

export default {
  name: 'IwDownload',
  components: {
    AIcon: Icon,
    APopover: Popover
  },
  props: {
    type: {
      // type: complex||simple
      // complex: 拥有下载表格和图表的功能
      // simple:  只有下载表格的功能
      type: String,
      default: 'complex'
    },
    chartId: {
      // 需要转化为图片的图表ID
      type: String,
      default: ''
    },
    appendToBody: {
      // 是否插入至body下, 默认true
      type: Boolean,
      default: false
    },
    checkDownloadApi: {
      tips: '检查是否有权下载api',
      type: String,
      default: ''
    },
    downloadApi: {
      // 下载表格所请求的API
      type: String,
      default: ''
    },
    downloadParams: {
      // 下载表格所请求的参数
      type: Object,
      default: () => { return {} }
    },
    chartAuth: {
      // 是否允许下载图表权限
      type: Boolean,
      default: true
    },
    dataAuth: {
      // 是否允许下载表格权限
      type: Boolean,
      default: true
    },
    isEchart: {
      // 是否EChart图表
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      token: getToken()
    }
  },
  mounted() {
  },
  methods: {
    checkAuth() {
      if (!this.dataAuth) return
      // 验证是否有下载权限
      const _this = this
      this.visible = false
      return new Promise((resolve, reject) => {
        request({
          url: '/iways-front/downloadAuth/checkUserDownloadAuth',
          method: 'get',
          params: {
            url: _this.checkDownloadApi || _this.downloadApi
          }
        }).then(response => {
          const isAble = response.data[0] || false
          // 临时
          // 把所有权限都设置为 有权限 下载
          // const isAble = true
          if (isAble) {
            _this.downloadData()
            notification['success']({
              message: '成功',
              description: '正在进行下载，请稍等片刻'
            })
          } else {
            notification['warning']({
              message: '失败',
              description: '您没有下载该数据的权限，请联系客服人员开通此功能，谢谢！'
            })
          }
          resolve(response)
        })
          .catch(error => {
            notification['error']({
              message: '失败',
              description: '下载失败，请联系客服人员说明情况，给您带来不便，抱歉！'
            })
            reject(error)
          })
      })
    },
    downloadData() {
      // 拼接下载api和其参数
      const params = {
        token: this.token,
        ...this.downloadParams
      }
      const api = '/api/sales-analysis' + this.downloadApi + '?' + queryEncoded(params)
      console.log('api', api)
      // setTimeout(() => {
      //   notification['success']({
      //     message: '成功',
      //     description: '文件下载成功'
      //   })
      // }, 1000)
      // 开始请求下载
      submitForm('get', api, params)
    },
    downloadChart() {
      if (!this.chartAuth) return
      notification['success']({
        message: '成功',
        description: '正在进行下载，请稍等片刻'
      })
      this.visible = false
      if (this.isEchart) {
        this.downloadEchart()
      } else {
        this.downloadDiv()
      }
    },
    downloadEchart() {
      // 改成调用html2canvas
      const chartId = '[chart-id="' + this.chartId + '"]'
      this.downloadDiv(chartId)
      // // 获取图表的canvas
      // const tag = '[chart-id=' + this.chartId + ']'
      // const el = document.querySelector(tag)
      // const canvas = el.getElementsByTagName('canvas')[0]
      // // 调用canvas的转化图片api
      // const image = canvas.toDataURL('image/jpeg')
      // // 生成一个a标签，进行图片下载
      // const $a = document.createElement('a')
      // $a.setAttribute('href', image)
      // $a.setAttribute('download', '')
      // if (window.navigator.userAgent.indexOf('Firefox') !== -1) { // 火狐浏览器需要把a元素插入dom才能点击生效
      //   document.body.appendChild($a)
      //   $a.click()
      //   $a.remove()
      // } else {
      //   $a.click()
      // }
    },
    // 截图
    async downloadDiv(chartId) {
      const el = this.getDownloadElement(chartId)
      this.hideElement()
      await html2canvas(el, {
        useCORS: false,
        allowTaint: false
      })
        .then(canvas => {
          this.imgmap = canvas.toDataURL()
          if (window.navigator.msSaveOrOpenBlob) {
            var bstr = atob(this.imgmap.split(',')[1])
            var n = bstr.length
            var u8arr = new Uint8Array(n)
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n)
            }
            var blob = new Blob([u8arr])
            window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'jpg')
          } else {
            // 这里就按照chrome等新版浏览器来处理
            const a = document.createElement('a')
            a.href = this.imgmap
            a.setAttribute('download', 'chart-download')
            if (window.navigator.userAgent.indexOf('Firefox') !== -1) { // 火狐浏览器需要把a元素插入dom才能点击生效
              document.body.append(a)
              a.click()
              a.remove()
            } else {
              a.click()
            }
          }
        })
        .finally(() => {
          this.showElement()
        })
        .catch(() => {
          this.showElement()
        })
    },
    getDownloadElement(chartId) { // 获取下载的容器元素，这里处理了svg图像
      const $el = $(chartId || this.chartId)
      const elements = $el.find('svg').map(function() {
        var svg = $(this)
        var canvas =
        $('<canvas></canvas>')
          .css({
            position: 'absolute',
            left: svg.css('left'),
            top: svg.css('top'),
            width: svg.css('width'),
            height: svg.css('height')
          })

        svg.replaceWith(canvas)

        var content = svg.wrap('<p></p>').parent().html()
        svg.unwrap()

        canvg(canvas[0], content)

        return {
          svg: svg,
          canvas: canvas
        }
      })

      elements.each(function() {
        this.canvas.replaceWith(this.svg)
      })

      return $el[0]
    },
    hideElement() { // 这个隐藏设置隐藏属性的元素
      const $el = $(this.chartId)
      $el.find('[not-download]').each((index, item) => {
        $(item).css('visibility', 'hidden')
      })
    },
    showElement() { // 这里还原隐藏掉的元素
      const $el = $(this.chartId)
      $el.find('[not-download]').each((index, item) => {
        // $(item).show()
        $(item).css('visibility', 'visible')
      })
    }
  }
}
</script>
<style lang="less">
.loadtype {
  display: block;
  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
  span {
    font-size: 12px;
    line-height: 1;
    color: #5a5a5a;
    text-align: center;
    display: block;
    float: left;
    padding: 8px 12px;
    cursor: pointer;
    &:nth-child(1) { border-right: 1px solid #eee;}
    &:hover { color: @primary-color; }
    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }
}
.iw-download {
  .ant-popover-inner-content { padding: 0;}
  i.disabled {
    color: #ccc;
    cursor: not-allowed;
  }
}
.ant-notification {
  z-index: 2211;
}
</style>

