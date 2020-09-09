<template>
  <div class="page-content">
    <b-row>
      <b-col md="12">
        <button type="button"
                class="btn btn-primary btn-block"
                @click="getMessage ">
          Click
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'SocketIo',
  data () {
    return {
      messageRxd: ''
    }
  },
  mounted () {
    this.socket = this.$nuxtSocket({ channel: '/pusher' })

    this.socket.on('getMessage', (c) => {
      console.log(c)
    })
  },
  methods: {
    getMessage () {
      return new Promise((resolve) => {
        this.socket.emit('getMessage', { id: 'abc123' }, (resp) => {
          this.messageRxd = resp
          resolve()
        })
      })
    }
  }
}
</script>
