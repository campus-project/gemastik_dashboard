<template>
  <div class="page-content">
    <b-row>
      <b-col md="12">
        <h4>
          Dashboard
        </h4>
      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col md="4">
        <traffic-card />
      </b-col>
      <b-col md="4">
        <face-mask-card />
      </b-col>
      <b-col md="4">
        <physical-distance-card />
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
import TrafficCard from '~/components/cards/Traffic'
import FaceMaskCard from '~/components/cards/FaceMask'
import PhysicalDistanceCard from '~/components/cards/PhysicalDistance'
import OverviewChart from '~/components/charts/OverviewChart'

export default {
  name: 'Dashboard',
  components: {
    TrafficCard,
    FaceMaskCard,
    PhysicalDistanceCard,
    OverviewChart
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
  head () {
    return {
      title: 'Dashboard'
    }
  }
}
</script>
