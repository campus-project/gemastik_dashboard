<template>
  <div class="page-content">
    <b-row>
      <b-col md="12">
        <pre>
          {{ detectionLogs }}
        </pre>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pusher',
  async asyncData ({ $axios, store }) {
    await $axios.get('/api/detection-log')
      .then(({ data }) => {
        store.commit('detection-log/setDetectionLog', data.data)
        // test
      })
  },
  computed: {
    ...mapGetters({
      detectionLogs: 'detection-log/getDetectionLogs'
    })
  }
}
</script>
