const { CREATED } = require('http-status')
const httpError = require('http-errors')
const Market = require('../../models/market')

module.exports = async (req, res, next) => {
  try {
    const { coordinates } = req.body
    const market = new Market({
      ...req.body,
      location: {
        coordinates,
      },
    })
    const newMarket = await market.save()
    res.status(CREATED).json({ id: newMarket.id })
  } catch (error) {
    next(httpError(400, error.message))
  }
}
