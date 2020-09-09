import Pusher from 'pusher-js'

export default ({ store }) => {
  const socket = new Pusher('8d921907fc15f3017c77', {
    cluster: 'ap1'
  })

  const channel = socket.subscribe('public-channel')
  channel.bind('new-detection-log', function (data) {
    store.commit('traffic/addTrafficInWeek', data)
    store.commit('detection-log/addDetectionLog', data)

    if (data.isUseMask) {
      store.commit('traffic/addUseMaskInWeek', data)
    }

    if (data.isKeepDistance) {
      store.commit('traffic/addKeepDistanceInWeek', data)
    }
  })
}
