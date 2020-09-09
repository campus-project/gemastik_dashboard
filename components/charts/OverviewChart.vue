<template>
  <b-card class="border-0 shadow-sm">
    <b-card-body>
      <div class="mb-2 d-flex justify-content-between align-items-baseline">
        <h6 class="card-title mb-0">
          Overview
        </h6>
      </div>

      <b-row>
        <b-col md="12">
          <client-only placeholder="Loading...">
            <apexcharts height="300"
                        class="mt-md-3 mt-xl-0"
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

export default {
  name: 'OverviewChart',
  data () {
    return {
      chartOptions: {
        chart: {
          type: 'area',
          parentHeightOffset: 0,
          foreColor: '#999',
          stacked: true,
          dropShadow: {
            enabled: true,
            enabledSeries: [0],
            top: -2,
            left: 2,
            blur: 5,
            opacity: 0.06
          }
        },
        // colors: ['#FF0D49', '#4E5BF2', '#25db01'],
        stroke: {
          curve: 'smooth',
          width: 3
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          strokeColor: '#fff',
          strokeWidth: 3,
          strokeOpacity: 1,
          fillOpacity: 1,
          hover: {
            size: 6
          }
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          tickAmount: 4,
          min: 0,
          labels: {
            offsetX: 24,
            offsetY: -5
          },
          tooltip: {
            enabled: true
          }
        },
        grid: {
          borderColor: 'rgba(77, 138, 240, .1)',
          padding: {
            left: -5,
            right: 5,
            bottom: -6
          }
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'center'
        },
        fill: {
          type: 'solid',
          fillOpacity: 0.7
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      physicalDistanceSeries: 'traffic/getSeriesKeepDistance',
      faceMaskSeries: 'traffic/getSeriesUseMask',
      trafficSeries: 'traffic/getSeriesTraffic'
    }),
    series () {
      return [
        {
          name: 'Trafik',
          data: this.trafficSeries
        },
        {
          name: 'Menggunakan Masker',
          data: this.faceMaskSeries
        },
        {
          name: 'Menjaga Jarak',
          data: this.physicalDistanceSeries
        }
      ]
    }
  }
}
</script>
