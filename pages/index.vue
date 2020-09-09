<template>
  <div class="page-content">
    <b-row class="mb-3">
      <b-col md="12">
        <object-detection />
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
  head () {
    return {
      title: 'Dashboard'
    }
  }
}
</script>
