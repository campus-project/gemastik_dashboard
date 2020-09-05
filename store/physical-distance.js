function randomThousand () {
  return Math.floor(Math.random() * 1000) + 1
}

function generateDayWiseTimeSeries (s, count) {
  const series = []
  let x = new Date('1 September 2020').getTime()
  for (let i = s; i < count; i++) {
    series.push([x, randomThousand()])
    x += 86400000
  }

  return series
}

const series = generateDayWiseTimeSeries(1, 30)
const seriesArray = series.map(a => a[1])

export const state = () => ({
  data: seriesArray[series.length - 1],
  oldData: seriesArray[series.length - 2],
  series,
  seriesArray: [
    { data: seriesArray }
  ]
})

export const getters = {
  getData: state => state.data,
  getDifference: state => state.data - state.oldData,
  getPercentage: (state, getters) => getters.getDifference / state.oldData * 100,
  getSeries: state => state.series,
  getSeriesArray: state => state.seriesArray
}
