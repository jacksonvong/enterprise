<template>
  <div>
    <a-card
      :body-style="{padding: '16px 24px'}">
      <div slot="title">
        <span>{{ $t('及竞品利润-销量分布') }}</span>
        <span class="title-extra">
          {{ $t('生命周期：新车型',[]) }}
        </span>
      </div>
      <div slot="extra" class="extra-wrapper">
        <span class="extra-datepicker">
          对比时间：
          <iw-date-picker
            v-model="dateVal1"
            type="month"
            size="mini"
            style="width: 130px;"
            align="right"
            placeholder="选择日期" />
        </span>
        <span class="extra-header-download">
          <iw-download
            type="simple"
            download-api="/market-overview-export/manf-rank"
            :download-params="{
            }"
          />
        </span>
      </div>
      <div style="height: 495px">
        <iw-chart :options="opt1" />
      </div>
    </a-card>
    <a-card
      :body-style="{padding: '16px 24px'}">
      <div slot="title">
        <span>{{ $t('竞争圈竞争格局分析图') }}</span>
        <span class="title-extra">
          {{ $t('生命周期：新车型',[]) }}
        </span>
      </div>
      <div slot="extra" class="extra-wrapper">
        <span class="extra-datepicker">
          对比时间：
          <iw-date-picker
            v-model="dateVal1"
            type="month"
            size="mini"
            style="width: 130px;"
            align="right"
            placeholder="选择日期" />
        </span>
        <span class="extra-header-download">
          <iw-download
            type="simple"
            download-api="/market-overview-export/manf-rank"
            :download-params="{
            }"
          />
        </span>
      </div>
      <div style="height: 495px">
        <iw-chart :options="opt1" />
      </div>
    </a-card>
  </div>
</template>
<script>
import { Card, Button, Divider, Table, Select } from 'ant-design-vue'
import IwDownload from '@/components/download/index'
import IwChart from '@/components/charts'

export default {
  components: {
    ACard: Card,
    AButton: Button,
    ADivider: Divider,
    ATable: Table,
    ASelect: Select,
    IwDownload,
    IwChart
  },
  data() {
    return {
      dateVal1: '',
      dateVal2: '',
      opt1: {
        visualMap: {
          type: 'continuous',
          show: true,
          max: 100,
          inRange: {
            symbolSize: [20, 120]
          },
          calculable: true,
          top: 0,
          right: 0,
          orient: 'horizontal',
          borderColor: '#f7f7f7',
          borderWidth: 2,
          padding: [6, 20]
        },
        color: ['#6398f5', '#cadcfc'],
        grid: {
          left: 50,
          right: 50,
          top: 60,
          bottom: 50
        },
        xAxis: {
          name: '利润',
          nameLocation: 'end',
          min: -50,
          max: 50,
          axisLabel: {
            show: true,
            align: 'center'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          name: '销售同比',
          nameLocation: 'end',
          min: -100,
          max: 100,
          axisLabel: {
            show: true,
            align: 'center',
            alignWithLabel: 'center'
          },
          splitLine: {
            show: false
          }
        },
        series: [{
          data: [
            [10.0, 89.04, 4],
            [10.0, -69.04, 55]
          ],
          type: 'scatter'
        }]
      }
    }
  }
}
</script>
<style lang="scss">
  .extra-wrapper{
    position: relative;
    .extra-datepicker{
      position: relative;
      line-height: 16px;
      top:-4px;
      right: 40px;
    }
  }

  .title-extra {
    position:relative;
    left: 14px;
    font-size: 12px;
    color: #7F8593;
  }
</style>
