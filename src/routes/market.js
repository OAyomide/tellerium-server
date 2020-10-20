const express = require('express')

const router = express.Router()

const {
  create,
  update,
  deleteMarket,
  searchByParams,
  get,
} = require('../controllers/market')
const { create: validateCreate } = require('../validator/market')

const auth = require('../middlewares/auth')
const { ADMIN } = require('../constants')

router.post('/', auth([ADMIN]), create)

router.get('/:id', auth(), get)

router.get('/search/markets', auth(), searchByParams)

router.put('/:id', [validateCreate, auth([ADMIN])], update)

router.delete('/:id', auth([ADMIN]), deleteMarket)

module.exports = router
