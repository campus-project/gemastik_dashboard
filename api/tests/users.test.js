const request = require('supertest')
const express = require('express')

const app = express()

app.get('/user', function (req, res) {
  res.status(200).json({
    data: {
      name: 'john'
    }
  })
})

app.get('/user/:id', function (req, res) {
  res.status(200).json({
    data: {
      name: req.params.id
    }
  })
})

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .get('/user')
      // .send({
      //   firstName: 'udin',
      //   lastName: 'hertanto'
      // })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('data')
  })

  it('should create a show post', async () => {
    const res = await request(app)
      .get('/user/1')
      // .send({
      //   firstName: 'udin',
      //   lastName: 'hertanto'
      // })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('data')
  })
})
