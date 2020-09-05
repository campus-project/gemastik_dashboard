export const mixins = {
  filters: {
    numberFormat (value, { minFraction, maxFraction } = { minFraction: 0, maxFraction: 5 }) {
      return parseFloat(value).toLocaleString(undefined, {
        minimumFractionDigits: minFraction,
        maximumFractionDigits: maxFraction
      })
    },
    numberFormatSuffix (value, suffix, { minFraction, maxFraction } = { minFraction: 0, maxFraction: 5 }) {
      return `${parseFloat(value).toLocaleString(undefined, {
        minimumFractionDigits: minFraction,
        maximumFractionDigits: maxFraction
      })}${suffix}`
    },
    numberFormatPrefix (value, prefix, { minFraction, maxFraction } = { minFraction: 0, maxFraction: 5 }) {
      return `${prefix}${parseFloat(value).toLocaleString(undefined, {
        minimumFractionDigits: minFraction,
        maximumFractionDigits: maxFraction
      })}`
    }
  },
  methods: {}
}
