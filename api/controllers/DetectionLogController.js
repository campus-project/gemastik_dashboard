const { Router } = require('express')
const DetectionLog = require('./../models/DetectionLog')

function index (req, res) {
  DetectionLog.find({}, 'timestamp isUseMask isKeepDistance', function (error, detectionLogs) {
    if (error) {
      console.error(error)
    }

    res.send({
      data: detectionLogs
    })
  }).sort({ _id: -1 })
}

function show (req, res) {
  DetectionLog.findById(req.params.id, 'timestamp isUseMask isKeepDistance', function (error, detectionLog) {
    if (error) {
      console.error(error)
    }

    res.send({
      data: detectionLog
    })
  })
}

function store (req, res) {
  const { isUseMask, isKeepDistance } = req.body
  const detectionLog = new DetectionLog({
    isUseMask,
    isKeepDistance
  })

  detectionLog.save(function (error) {
    if (error) {
      console.log(error)
    }

    DetectionLog.aggregate(
      [{
        $group: {
          _id: '$name',
          total_detection: { $sum: 1 }
        }
      }],

      function (err, results) {
        if (err) {
          throw err
        }

        console.log(results)

        req.io.sockets.emit('detectionLog', results)
      }
    )

    res.send({
      success: true,
      message: 'Created successfully!',
      data: detectionLog
    })
  })
}

function update (req, res) {
  DetectionLog.findById(req.params.id, 'timestamp isUseMask isKeepDistance', function (error, detectionLog) {
    if (error) {
      console.error(error)
    }

    const { isUseMask, isKeepDistance } = req.body

    detectionLog.isUseMask = isUseMask
    detectionLog.isKeepDistance = isKeepDistance

    detectionLog.save(function (error) {
      if (error) {
        console.log(error)
      }

      res.send({
        success: true,
        message: 'Updated successfully',
        data: detectionLog
      })
    })
  })
}

function destroy (req, res) {
  DetectionLog.remove({
    _id: req.params.id
  }, function (err, detectionLog) {
    if (err) {
      res.send(err)
    }

    res.send({
      success: true
    })
  })
}

exports.index = index
exports.show = show
exports.store = store
exports.update = update
exports.destroy = destroy

const router = Router()
router.get('/detection-log', index)
router.post('/detection-log', store)
router.get('/detection-log/:id', show)
router.put('/detection-log/:id', update)
router.delete('/detection-log/:id', destroy)

module.exports = router
