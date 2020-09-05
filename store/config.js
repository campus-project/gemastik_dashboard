export const state = () => ({
  countUp: {
    useEasing: true,
    useGrouping: true,
    separator: '.',
    decimal: ',',
    prefix: '',
    suffix: ''
  },
  countUpPercentage: {
    useEasing: true,
    useGrouping: true,
    separator: '.',
    decimal: ',',
    prefix: '',
    suffix: '%'
  }
})

export const getters = {
  getConfigCountUp: state => state.countUp,
  getConfigCountUpPercentage: state => state.countUpPercentage
}
