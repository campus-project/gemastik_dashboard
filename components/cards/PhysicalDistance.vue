<template>
  <b-card class="border-0 shadow-sm">
    <b-card-body>
      <div class="mb-2 d-flex justify-content-between align-items-baseline">
        <h6 class="card-title mb-0">
          MENJAGA JARAK
        </h6>
      </div>

      <b-row>
        <b-col md="6">
          <h3 class="mb-2">
            <client-only placeholder="Loading...">
              <i-count-up :delay="1000"
                          :end-val="totalKeepDistanceToday"
                          :options="countUpConfig"></i-count-up>
            </client-only>
          </h3>
          <div class="d-flex align-items-baseline">
            <client-only>
              <p :class="[differenceKeepDistancePercentage > 0 ? 'text-success' : 'text-danger']">
                      <span>
                        <i-count-up :delay="200"
                                    :end-val="differenceKeepDistancePercentage"
                                    :options="configCountUpPercentage"></i-count-up>
                      </span>
                <font-awesome-icon far
                                   :icon="differenceKeepDistancePercentage > 0 ? 'arrow-up' : 'arrow-down'" />
              </p>
            </client-only>
          </div>
        </b-col>

        <b-col md="6">
          <client-only>
            <apexcharts height="60"
                        class="mt-md-3 mt-xl-0"
                        type="line"
                        :options="chartOptions"
                        :series="series"></apexcharts>
          </client-only>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import ICountUp from 'vue-countup-v2'

export default {
  name: 'KeepDistance',
  components: {
    ICountUp
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      totalKeepDistanceToday: 'traffic/getTotalKeepDistanceToday',
      totalKeepDistanceYesterday: 'traffic/getTotalKeepDistanceYesterday',
      differenceKeepDistancePercentage: 'traffic/getDifferenceKeepDistancePercentage',
      countUpConfig: 'config/getConfigCountUp',
      configCountUpPercentage: 'config/getConfigCountUpPercentage',
      series: 'traffic/getSeriesKeepDistanceArray'
    }),
    chartOptions () {
      return {
        chart: {
          type: 'line',
          height: 60,
          sparkline: {
            enabled: !0
          }
        },
        stroke: {
          width: 2,
          curve: 'smooth'
        },
        markers: {
          size: 0
        },
        colors: [this.differenceKeepDistancePercentage > 0 ? '#28A745' : '#E6212B'],
        tooltip: {
          fixed: {
            enabled: !1
          },
          x: {
            show: !1
          },
          y: {
            title: {
              formatter (e) {
                return ''
              }
            }
          },
          marker: {
            show: !1
          }
        }
      }
    }
  }
}
</script>
