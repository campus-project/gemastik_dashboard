export const state = () => ({
  detectionLogs: []
})

export const mutations = {
  addDetectionLog (state, payload) {
    state.detectionLogs.push(payload)
  },
  setDetectionLog (state, payload) {
    state.detectionLogs = payload
  }
}

export const getters = {
  getDetectionLogs: state => state.detectionLogs,
  getTotalTraffic: state => state.detectionLogs.length,
  getTotalUsageMask: state => state.detectionLogs.filter(a => a.isUseMask).length,
  getTotalKeepDistance: state => state.detectionLogs.filter(a => a.isKeepDistance).length
}
