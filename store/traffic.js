import moment from 'moment'

export const state = () => ({
  trafficInWeek: [],
  useMaskInWeek: [],
  keepDistanceInWeek: []
})

export const mutations = {
  addTrafficInWeek (state, payload) {
    state.trafficInWeek.push(payload)
  },
  addUseMaskInWeek (state, payload) {
    state.useMaskInWeek.push(payload)
  },
  addKeepDistanceInWeek (state, payload) {
    state.keepDistanceInWeek.push(payload)
  },
  setTrafficInWeek (state, payload) {
    state.trafficInWeek = payload
  },
  setUseMaskInWeek (state, payload) {
    state.useMaskInWeek = payload
  },
  setKeepDistanceInWeek (state, payload) {
    state.keepDistanceInWeek = payload
  }
}

export const getters = {
  getTrafficInWeek: state => state.trafficInWeek,
  getTotalTrafficToday: state => state.trafficInWeek.filter(a => moment(a.timestamp).isSame(new Date(), 'day')).length,
  getTotalTrafficYesterday: state => state.trafficInWeek.filter(a => moment(a.timestamp).isSame((moment().subtract(1, 'day').format()), 'day')).length,
  getDifferenceTraffic: (state, getters) => getters.getTotalTrafficToday - getters.getTotalTrafficYesterday,
  getDifferenceTrafficPercentage: (state, getters) => {
    const value = getters.getDifferenceTraffic / getters.getTotalTrafficYesterday * 100
    if (isNaN(value)) {
      return 0
    }

    return value
  },

  getUseMaskInWeek: state => state.useMaskInWeek,
  getTotalUseMaskToday: state => state.useMaskInWeek.filter(a => moment(a.timestamp).isSame(new Date(), 'day')).length,
  getTotalUseMaskYesterday: state => state.useMaskInWeek.filter(a => moment(a.timestamp).isSame((moment().subtract(1, 'day').format()), 'day')).length,
  getDifferenceUseMask: (state, getters) => getters.getTotalUseMaskToday - getters.getTotalUseMaskYesterday,
  getDifferenceUseMaskPercentage: (state, getters) => {
    const value = getters.getDifferenceUseMask / getters.getTotalUseMaskYesterday * 100
    if (isNaN(value)) {
      return 0
    }

    return value
  },

  getKeepDistanceInWeek: state => state.keepDistanceInWeek,
  getTotalKeepDistanceToday: state => state.keepDistanceInWeek.filter(a => moment(a.timestamp).isSame(new Date(), 'day')).length,
  getTotalKeepDistanceYesterday: state => state.keepDistanceInWeek.filter(a => moment(a.timestamp).isSame((moment().subtract(1, 'day').format()), 'day')).length,
  getDifferenceKeepDistance: (state, getters) => getters.getTotalKeepDistanceToday - getters.getTotalKeepDistanceYesterday,
  getDifferenceKeepDistancePercentage: (state, getters) => {
    const value = getters.getDifferenceKeepDistance / getters.getTotalKeepDistanceYesterday * 100
    if (isNaN(value)) {
      return 0
    }

    return value
  },

  getSeriesTraffic: (state) => {
    const trafficInWeekGrouped = state.trafficInWeek.reduce((r, a) => {
      const timestamp = moment(a.timestamp).format('YYYY-MM-DD')
      r[timestamp] = r[timestamp] || []
      r[timestamp].push(a)
      return r
    }, Object.create(null))

    const series = []
    Object.keys(trafficInWeekGrouped).slice().reverse().forEach((date) => {
      const x = new Date(date).getTime()
      series.push([x, trafficInWeekGrouped[date].length])
    })

    return series
  },
  getSeriesTrafficArray: (state, getters) => {
    return [
      { data: getters.getSeriesTraffic.map(a => a[1]) }
    ]
  },

  getSeriesUseMask: (state) => {
    const useMaskInWeekGrouped = state.useMaskInWeek.reduce((r, a) => {
      const timestamp = moment(a.timestamp).format('YYYY-MM-DD')
      r[timestamp] = r[timestamp] || []
      r[timestamp].push(a)
      return r
    }, Object.create(null))

    const series = []
    Object.keys(useMaskInWeekGrouped).slice().reverse().forEach((date) => {
      const x = new Date(date).getTime()
      series.push([x, useMaskInWeekGrouped[date].length])
    })

    return series
  },
  getSeriesUseMaskArray: (state, getters) => {
    return [
      { data: getters.getSeriesUseMask.map(a => a[1]) }
    ]
  },

  getSeriesKeepDistance: (state) => {
    const keepDistanceInWeekGrouped = state.keepDistanceInWeek.reduce((r, a) => {
      const timestamp = moment(a.timestamp).format('YYYY-MM-DD')
      r[timestamp] = r[timestamp] || []
      r[timestamp].push(a)
      return r
    }, Object.create(null))

    const series = []
    Object.keys(keepDistanceInWeekGrouped).slice().reverse().forEach((date) => {
      const x = new Date(date).getTime()
      series.push([x, keepDistanceInWeekGrouped[date].length])
    })

    return series
  },
  getSeriesKeepDistanceArray: (state, getters) => {
    return [
      { data: getters.getSeriesKeepDistance.map(a => a[1]) }
    ]
  }
}
