<template>
  <b-row>
    <b-col md="5">
      <div id="video-wrapper"
           class="video-wrapper">
        <video ref="videoRef"
               autoPlay="autoplay"
               muted
               playsInline
               :width="videoWrapperWidth"
               :height="videoWrapperHeight" />

        <canvas ref="canvasRef"
                :width="videoWrapperWidth"
                :height="videoWrapperHeight" />
      </div>
    </b-col>

    <b-col md="3">
      <div class="video-info-wrapper">
        <b-card class="border-0 shadow-sm">
          <b-card-body>
            <div class="mb-2">
              <h4 class="card-title mb-0">
                SITUASI SAAT INI
              </h4>
            </div>

            <b-row>
              <b-col md="12">
                <b-table :items="items"
                         thead-class="d-none"
                         borderless></b-table>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </div>
    </b-col>

    <b-col md="4">
      <div class="video-graph-wrapper">
        <traffic-card />

        <face-mask-card />

        <physical-distance-card />
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import TrafficCard from '~/components/cards/Traffic'
import FaceMaskCard from '~/components/cards/FaceMask'
import PhysicalDistanceCard from '~/components/cards/PhysicalDistance'

export default {
  components: {
    TrafficCard,
    FaceMaskCard,
    PhysicalDistanceCard
  },
  data () {
    return {
      items: [
        { title: '- Trafik', total: 0 },
        { title: '- Menggunakan Masker', total: 0 },
        { title: '- Menjaga Jarak', total: 0 },
        { title: '- Pelanggar Masker', total: 0 },
        { title: '- Pelanggar Menjaga Jarak', total: 0 }
      ]
    }
  },
  computed: {
    ...mapGetters({
      totalTraffic: 'detection-log/getTotalTraffic',
      totalUsageMask: 'detection-log/getTotalUsageMask',
      totalKeepDistance: 'detection-log/getTotalKeepDistance'
    }),
    totalOffenderMask () {
      return this.totalTraffic - this.totalUsageMask
    },
    totalOffenderDistance () {
      return this.totalTraffic - this.totalKeepDistance
    },
    videoWrapperWidth () {
      if (process.client) {
        const dom = document.getElementById('video-wrapper')
        if (dom && dom.clientWidth) {
          return dom.clientWidth
        }
      }

      return 720
    },
    videoWrapperHeight () {
      if (process.client) {
        const dom = document.getElementById('video-wrapper')
        if (dom && dom.clientHeight) {
          return dom.clientHeight
        }
      }

      return 500
    }
  },
  watch: {
    totalTraffic: {
      handler (val) {
        this.items[0].total = val
      }
    },
    totalUsageMask: {
      handler (val) {
        this.items[1].total = val
      }
    },
    totalKeepDistance: {
      handler (val) {
        this.items[2].total = val
      }
    },
    totalOffenderMask: {
      handler (val) {
        this.items[3].total = val
      }
    },
    totalOffenderDistance: {
      handler (val) {
        this.items[4].total = val
      }
    }
  },
  beforeMount () {
    this.$axios.get('/api/detection-log')
      .then(({ data }) => {
        this.$store.commit('detection-log/setDetectionLog', data.data)
      })

    this.$axios.get('/api/traffic-in-week')
      .then(({ data }) => {
        this.$store.commit('traffic/setTrafficInWeek', data.data)
      })

    this.$axios.get('/api/use-mask-in-week')
      .then(({ data }) => {
        this.$store.commit('traffic/setUseMaskInWeek', data.data)
      })

    this.$axios.get('/api/keep-distance-in-week')
      .then(({ data }) => {
        this.$store.commit('traffic/setKeepDistanceInWeek', data.data)
      })
  },
  mounted () {
    const { videoRef } = this.$refs
    if (videoRef) {
      if (navigator.mediaDevices && (navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia)) {
        // define a Promise that'll be used to load the webcam and read its frames
        const webcamPromise = navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: false
          })
          .then((stream) => {
            // pass the current frame to the window.stream
            window.stream = stream
            // pass the stream to the this.$refs.videoRef
            videoRef.srcObject = stream

            return new Promise((resolve) => {
              videoRef.onloadedmetadata = () => {
                resolve()
              }
            })
          }, (error) => {
            console.log("Couldn't start the webcam")
            console.error(error)
          })

        // define a Promise that'll be used to load the model
        // eslint-disable-next-line no-undef
        const loadlModelPromise = cocoSsd.load()

        // resolve all the Promises
        Promise.all([loadlModelPromise, webcamPromise])
          .then((values) => {
            this.detectFromVideoFrame(values[0], videoRef)
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
  },
  methods: {
    detectFromVideoFrame (model, video) {
      model.detect(video).then((predictions) => {
        this.showDetections(predictions)

        requestAnimationFrame(() => {
          this.detectFromVideoFrame(model, video)
        })
      }, (error) => {
        console.log("Couldn't start the webcam")
        console.error(error)
      })
    },
    showDetections (predictions) {
      const { canvasRef } = this.$refs
      if (canvasRef) {
        const ctx = canvasRef.getContext('2d')
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        const font = '24px helvetica'
        ctx.font = font
        ctx.textBaseline = 'top'

        predictions.forEach((prediction) => {
          const x = prediction.bbox[0]
          const y = prediction.bbox[1]
          const width = prediction.bbox[2]
          const height = prediction.bbox[3]
          // Draw the bounding box.
          ctx.strokeStyle = '#2fff00'
          ctx.lineWidth = 1
          ctx.strokeRect(x, y, width, height)
          // Draw the label background.
          ctx.fillStyle = '#2fff00'
          const textWidth = ctx.measureText(prediction.class).width
          const textHeight = parseInt(font, 10)
          // draw top left rectangle
          ctx.fillRect(x, y, textWidth + 10, textHeight + 10)
          // draw bottom left rectangle
          ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10)

          // Draw the text last to ensure it's on top.
          ctx.fillStyle = '#000000'
          ctx.fillText(prediction.class, x, y)
          ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight)
        })
      }
    }
  }
}
</script>
