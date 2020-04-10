<template>
  <div>
    <a-card
      :title="$t('及竞品月度激励走势',[])"
      :body-style="{padding: '16px 24px'}">
      <span slot="extra" class="extra-header-download">
        <iw-download
          type="simple"
          download-api="/market-overview-export/manf-rank"
          :download-params="{
          }"
        />
      </span>
      <div style="height: 400px">
        <iw-chart :options="optPrice" />
      </div>
    </a-card>
    <a-card
      :title="$t('月度激励节奏情况')"
      :body-style="{padding: '16px 24px'}">
      <div class="model-select-wrapper">
        <span style="color: #181C28;">{{ $t('选择车型：') }}</span>
        <span>
          <a-button type="primary" class="model-select-item">本品</a-button>
          <a-button class="model-select-item">竞品1</a-button>
          <a-button class="model-select-item">竞品2</a-button>
          <a-button class="model-select-item">竞品3</a-button>
          <a-select class="model-select-item" />
        </span>
      </div>
      <a-table
        :columns="condition.columns"
        :data-source="condition.data"
        bordered>
        <div slot="detail" slot-scope="scope" style="margin: -16px">
          <template v-if="scope === null">
            <p style="padding: 16px">
              -
            </p>
          </template>
          <template v-else>
            <div v-for="(item , index) in scope.detail" :key="index" class="detail-item">
              {{ item }}
            </div>
          </template>
        </div>
      </a-table>
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
      optPrice: {
        color: ['#6398f5', '#36c585', '#f9826f', '#ffaa42'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告'],
          bottom: '-5px'
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            bottom: '26px',
            handleIcon:
              'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z',
            handleSize: '50%',
            start: 1,
            end: 50
          }
        ],
        grid: {
          top: '30px',
          left: '16px',
          right: '16px',
          bottom: '66px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: [
          {
            type: 'value',
            name: '销量',
            nameLocation: 'end',
            splitLine: { // 网格线
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true // 隐藏或显示
            }
          }
        ],
        series: [
          {
            smooth: true,
            name: '邮件营销',
            type: 'line',
            barMaxWidth: '38px',
            data: [120, 132, 101, 134, 90, 230, 210],
            yAxisIndex: 0,
            label: {
              show: true
            },
            symbolSize: 6
          },
          {
            smooth: true,
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
            yAxisIndex: 0,
            label: {
              show: true
            },
            symbolSize: 6
          }
        ]

      },
      condition: {
        data: [
          {
            model: 'A7',
            a: '提车奖励',
            b: '提车奖励',
            months: [null]
          },
          {
            model: 'A7',
            a: '零售奖励',
            b: '',
            months: [
              {
                detail: [
                  '销量提升补充支持 : 9,000',
                  '国五车型额外销售支持: 4'
                ]
              }
            ]
          },
          {
            model: 'A7',
            a: '专项奖励',
            b: '',
            months: [
              {
                detail: [
                  '销量提升补充支持 : 9,000',
                  '国五车型额外销售支持: 4'
                ]
              }
            ]
          },
          {
            model: 'A7',
            a: '人员奖励',
            b: '',
            months: [
              {
                detail: [
                  '销量提升补充支持 : 9,000',
                  '国五车型额外销售支持: 4'
                ]
              }
            ]
          }
        ],
        columns: []
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.condition.columns = [
        {
          title: this.$t('车型'),
          dataIndex: 'model',
          align: 'center',
          fixed: 'left',
          width: 70,
          customRender: (text, row, index) => {
            return {
              children: text,
              attrs: {
                rowSpan: index === 0 ? 4 : 0
              }
            }
          }
        },
        {
          title: this.$t('奖励大项'),
          dataIndex: 'a',
          width: 100,
          align: 'center'
        },
        {
          title: this.$t('奖励小项'),
          dataIndex: 'b',
          width: 100,
          align: 'center'
        },
        {
          title: this.$t('5月'),
          dataIndex: 'months[0]',
          align: 'center',
          scopedSlots: { customRender: 'detail' }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-item {
    text-align: left;
    padding: 10px;
    background: #ecf3fe;
    margin-bottom: 2px;
  }

  .model-select-wrapper {
    line-height: 32px;
    margin-bottom: 20px;

    .model-select-item {
      margin: 0 7px;
      width: 92px;
    }
  }
</style>
