const httpError = require('http-errors')
const market = require('../../models/market')

module.exports = async (req, res, next) => {
  try {
    await market.deleteOne({ _id: req.params.id })
    res.sendStatus(204)
  } catch (error) {
    next(httpError(500, error.message))
  }
}
