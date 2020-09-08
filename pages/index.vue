<template>
  <div class="page-content">
    <b-row class="mb-3">
      <b-col md="12">
        <object-detection />
      </b-col>
    </b-row>

    <b-row>
      <b-col md="12">
        <button type="button"
                class="btn btn-primary"
                @click="method1">
          test
        </button>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="12">
        <overview-chart></overview-chart>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import OverviewChart from '~/components/charts/OverviewChart'
import ObjectDetection from '~/components/tensorflow/ObjectDetection'

export default {
  name: 'Index',
  components: {
    OverviewChart,
    ObjectDetection
  },
  data () {
    return {
      chartOptions: {
        series: [{
          data: [1, 2, 3] // sample data
        }]
      }
    }
  },
  mounted () {
    this.socket = this.$nuxtSocket({
      name: 'home',
      channel: '/index',
      reconnection: false
    })

    this.socket
      .on('getMessage', (msg, cb) => {
        console.log(msg)
        console.log(cb)
      })
  },
  methods: {
    method1 () {
      /* Emit events */
      this.socket.emit('getMessage', { id: 'abc123' }, (resp) => {
        this.messageRxd = resp
      })
    }
  },
  head () {
    return {
      title: 'Dashboard'
    }
  }
}
</script>
