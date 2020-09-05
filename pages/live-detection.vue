<template>
  <div class="page-content">
    <b-row>
      <b-col md="12">
        <h4>
          Live Detection
        </h4>
      </b-col>
    </b-row>

    <div class="row">
      <div class="col-md-12">
        <video
          id="videoRef"
          autoPlay="autoplay"
          muted
          playsInline
          width="720"
          height="600"
        />
        <canvas id="canvasRef"
                width="720"
                height="650" />
      </div>
    </div>

    <!--<b-row class="mb-3">
      <b-col md="12">
        <video autoplay
               src="https://r3-&#45;&#45;sn-2uuxa3vh-jb36.googlevideo.com/videoplayback?expire=1599369685&ei=dB1UX4biOoPkgQf7nL6wDQ&ip=118.98.90.22&id=o-APKxqSPiRF_zb7sOMn_6wP9jG9DhRo42K2gOWC0BFxGs&itag=18&source=youtube&requiressl=yes&gcr=id&vprv=1&mime=video%2Fmp4&gir=yes&clen=19702711&ratebypass=yes&dur=232.478&lmt=1574747794247892&fvip=3&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhALutSfO-I_2M9JUZPn190QOlFCyusw3RjKwffTN2OPZYAiEAoX4fQAHHj8XYLqoYVX0bhgGSMWOTZ2DbnQPFCMTP0dw%3D&video_id=DzwkcbTQ7ZE&title=Jessie+J+-+Flashlight+%28from+Pitch+Perfect+2%29+%28Official+Video%29&redirect_counter=1&rm=sn-nposr7s&req_id=3213d70fdb52a3ee&cms_redirect=yes&ipbypass=yes&mh=id&mip=36.71.57.145&mm=31&mn=sn-2uuxa3vh-jb36&ms=au&mt=1599348036&mv=m&mvi=3&pl=21&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgGmmBeLAIuNQ4AYj_QxmOR1NDV2NQswh_GTmuRR2doAMCIQDVpzOfY9EgLTF_nAtbp4lJd-ZgjwKdM8t7OjQBSjvEsQ%3D%3D"></video>
      </b-col>
    </b-row>-->
  </div>
</template>

<script>
export default {
  mounted () {
    const videoRef = document.getElementById('videoRef')
    if (navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia) {
      // define a Promise that'll be used to load the webcam and read its frames
      const webcamPromise = navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false
        })
        .then((stream) => {
          // pass the current frame to the window.stream
          window.stream = stream
          // pass the stream to the videoRef
          videoRef.srcObject = stream

          return new Promise((resolve) => {
            videoRef.onloadedmetadata = () => {
              resolve()
            }
          })
        }, (error) => {
          alert(error)
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
          alert(error)
          console.error(error)
        })
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
        alert(error)
        console.log("Couldn't start the webcam")
        console.error(error)
      })
    },
    showDetections (predictions) {
      const canvasRef = document.getElementById('canvasRef')
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
  },
  head () {
    return {
      title: 'Dashboard'
    }
  }
}
</script>
