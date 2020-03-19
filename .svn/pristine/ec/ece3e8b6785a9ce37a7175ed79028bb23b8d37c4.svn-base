<template>
  <div :id="id||randomId" class="charts-container" :options="options" :events="events" :style="styles" />
</template>
<script>
const echarts = require('echarts')
export default {
  name: 'IwChart',
  props: {
    id: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    reload: {
      type: String,
      default: '0'
    },
    styles: {
      type: String,
      default: ''
    },
    events: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      myChart: {},
      randomId: 'chart' + new Date().getTime() + Math.ceil(Math.random() * 10000000) // 随机Id
    }
  },
  watch: {
    reload() {
      if (this.reload) {
        const id = (this.id || this.randomId)
        if (!id) return
        this.myChart = echarts.init(document.querySelector('#' + id))
        this.myChart.setOption(this.options, true)
        // bus.$emit('ResizeChart')
      }
    },
    options: {
      handler(newValue, oldValue) {
        if (this.options.series) {
          const id = (this.id || this.randomId)
          if (!id) return
          this.myChart = echarts.init(document.querySelector('#' + id))
          this.myChart.clear()
          this.myChart.setOption(this.options, true)
          this.myChart.resize()
          // bus.$emit('ResizeChart')
        }
        // 基于准备好的dom，初始化echarts实例
      },
      deep: true
    },
    events: {
      handler() {
        const id = (this.id || this.randomId)
        if (!id) return
        this.myChart = echarts.init(document.querySelector('#' + id))
        for (const types in this.events) {
          let func = (param) => {}
          if (typeof this.events[types] === 'function') {
            func = this.events[types]
          } else {
            if (typeof this.events[types][1] === 'function') {
              const myChart = this.myChart
              func = (param) => {
                this.events[types][1](param, myChart)
              }
            }
          }
          this.myChart.off(types)
          this.myChart.on(types, func)
        }
      },
      deep: true
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.$nextTick(() => {
      const id = (this.id || this.randomId)
      if (!id) return
      this.myChart = echarts.init(document.querySelector('#' + id))
      this.myChart.setOption(this.options)
      this.init()
    })
  },
  methods: {
    init() {
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
      // var myChart = this.myChart
      // bus.$on('ResizeChart', function() {
      //   setTimeout(() => {
      //     myChart.resize()
      //   }, 50)
      // })
    }
  }
}
</script>
<style lang="less" scoped>
.charts-container {
  width: 100%;
  height: 100%;
}
</style>

