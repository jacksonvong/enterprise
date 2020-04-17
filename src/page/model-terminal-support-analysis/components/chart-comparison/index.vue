<template>
  <div class="chart-comparison">
    <div v-if="chartType === 'bar'" class="timeline">
      <div class="dash-line" />
      <div class="last">
        <span class="timeline-item">{{ timeline[0] }}</span>
      </div>
      <div class="current">
        <span class="timeline-item">{{ timeline[1] }}</span>
      </div>
    </div>
    <div v-if="chartType === 'pie'" class="timeline">
      <div class="dash-line" />
      <div class="last">
        <span class="timeline-item">{{ comparisonPieData.timeList[0] }}</span>
      </div>
      <div class="current">
        <span class="timeline-item">{{ comparisonPieData.timeList[1] }}</span>
      </div>
    </div>
    <div v-if="chartType === 'bar'" class="bar-wrapper">
      <div class="bar-item">
        <iw-chart :options="comparisonBarData[0]" />
      </div>
      <div class="vs-item">
        VS
      </div>
      <div class="bar-item">
        <iw-chart :options="comparisonBarData[1]" />
      </div>
    </div>
    <div v-if="chartType === 'pie'" class="pie-wrapper">
      <div v-for="(item, index) in comparisonPieData.nameList" :key="index" class="pie-row">
        <div class="pie-marker">
          {{ item.name }}
        </div>
        <div class="pie-item">
          <iw-chart :options="getPieOption(comparisonPieData.series[index * 2],item.name)" />
        </div>
        <div class="vs-item">
          VS
        </div>
        <div class="pie-item">
          <iw-chart :options="getPieOption(comparisonPieData.series[index * 2 + 1],item.name)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IwChart from '@/components/charts'
import { Chart } from '@/utils/charts'

export default {
  components: {
    IwChart
  },
  props: {
    timeline: {
      type: Array,
      default() {
        return []
      }
    },
    chartType: {
      type: String,
      default() {
        return 'bar'
      }
    },
    comparisonBarData: {
      type: Array,
      default() {
        return []
      }
    },
    comparisonPieData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {

    getPieOption(opt, name) {
      opt.name = name
      const optModified = new Chart('pie', {
        series: [
          opt
        ]
      },
      {
        legend: {
          top: 10,
          type: 'scroll'
        }
      }).getChart()
      optModified.series.forEach(item => {
        item.label.normal = {
          position: 'outer',
          alignTo: 'none',
          bleedMargin: 5,
          show: true
        }
      })
      return optModified
    }
  }
}
</script>
<style lang="scss" scoped>
  .chart-comparison {
    .timeline {
      position: relative;
      display: flex;
      margin-bottom: 20px;

      .last, .current {
        width: 50%;
        text-align: center;
        z-index: 1;
      }

      .timeline-item {
        display: inline-block;
        line-height: 30px;
        height: 30px;
        border: 1px solid #2E5AA6;
        width: 112px;
        border-radius: 4px;
        background: white;
      }

      .dash-line {
        position: absolute;
        width: 100%;
        height: 50%;
        border-bottom: dashed 1px #2E5AA6;
        z-index: 0;
      }
    }

    .bar-wrapper {
      display: flex;

      .bar-item {
        width: calc(50% - 36px / 2);
        height: 400px;
      }

      .vs-item {
        height: 400px;
        line-height: 400px;
        font-size: 36px;
        color: #9494AD;
      }

    }

    .pie-wrapper {

      .pie-row {
        display: flex;

        .pie-marker {
          display: flex;
          height: 400px;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 18px;
          color: #181C28;
          width: 100px;
        }

        .pie-item {
          width: calc(50% - 36px / 2 - 100px / 2);
          height: 400px;
        }

        .vs-item {
          height: 400px;
          line-height: 400px;
          font-size: 36px;
          color: #9494AD;
        }
      }
    }

  }
</style>

