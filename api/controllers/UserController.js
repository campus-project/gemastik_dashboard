const { Router } = require('express')
const User = require('./../models/User')

function index (req, res) {
  User.find({}, 'firstName lastName', function (error, users) {
    if (error) {
      console.error(error)
    }

    res.send({
      data: users
    })
  }).sort({ _id: -1 })
}

function show (req, res) {
  User.findById(req.params.id, 'firstName lastName', function (error, user) {
    if (error) {
      console.error(error)
    }

    res.send({
      data: user
    })
  })
}

function store (req, res) {
  const { firstName, lastName } = req.body
  const user = new User({
    firstName,
    lastName
  })

  user.save(function (error) {
    if (error) {
      console.log(error)
    }

    res.send({
      success: true,
      message: 'Created successfully!',
      data: user
    })
  })
}

function update (req, res) {
  User.findById(req.params.id, 'firstName lastName', function (error, user) {
    if (error) {
      console.error(error)
    }

    const { firstName, lastName } = req.body

    user.firstName = firstName
    user.lastName = lastName

    user.save(function (error) {
      if (error) {
        console.log(error)
      }

      res.send({
        success: true,
        message: 'Updated successfully',
        data: user
      })
    })
  })
}

function destroy (req, res) {
  User.remove({
    _id: req.params.id
  }, function (err, user) {
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
router.get('/user', index)
router.post('/user', store)
router.get('/user/:id', show)
router.put('/user/:id', update)
router.delete('/user/:id', destroy)

module.exports = router
