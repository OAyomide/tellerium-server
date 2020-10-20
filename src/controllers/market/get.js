const { NOT_FOUND } = require('http-status')
const httpError = require('http-errors')
const Market = require('../../models/market')

module.exports = async (req, res, next) => {
  try {
    const market = await Market.findById(req.params.id).lean()
    if (!market) {
      return res.sendStatus(NOT_FOUND)
    }
    res.json(market)
  } catch (error) {
    next(httpError(400, error.message))
  }
}
