import moment from 'moment'

const { Router } = require('express')
const DetectionLog = require('./../models/DetectionLog')

function trafficInWeek (req, res) {
  // res.send(moment().format('YYYY-MM-DD'))
  DetectionLog.find({
    timestamp: { $gte: moment().subtract(7, 'days').format(), $lt: moment().format() }
  }, 'timestamp isUseMask isKeepDistance', function (error, detectionLogs) {
    if (error) {
      console.error(error)
    }

    res.send({
      data: detectionLogs
    })
  }).sort({ _id: -1 })
}

function useMaskInWeek (req, res) {
  DetectionLog.find({
    isUseMask: true,
    timestamp: { $gte: moment().subtract(7, 'days').format(), $lt: moment().format() }
  }, 'timestamp isUseMask isKeepDistance', function (error, detectionLogs) {
    if (error) {
      console.error(error)
    }

    res.send({
      data: detectionLogs
    })
  }).sort({ _id: -1 })
}

function keepDistanceInWeek (req, res) {
  DetectionLog.find({
    isKeepDistance: true,
    timestamp: { $gte: moment().subtract(7, 'days').format(), $lt: moment().format() }
  }, 'timestamp isUseMask isKeepDistance', function (error, detectionLogs) {
    if (error) {
      console.error(error)
    }

    res.send({
      data: detectionLogs
    })
  }).sort({ _id: -1 })
}

exports.trafficInWeek = trafficInWeek
exports.useMaskInWeek = useMaskInWeek
exports.keepDistanceInWeek = keepDistanceInWeek

const router = Router()
router.get('/traffic-in-week', trafficInWeek)
router.get('/use-mask-in-week', useMaskInWeek)
router.get('/keep-distance-in-week', keepDistanceInWeek)

module.exports = router
