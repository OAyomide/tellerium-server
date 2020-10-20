const httpError = require('http-errors')
const Market = require('../../models/market')

module.exports = async (req, res, next) => {
  try {
    const fields = {
      ...req.body,
    }
    const { coordinates } = req.body.coordinates
    if (coordinates) {
      fields.location = {
        coordinates,
      }
    }
    await Market.updateOne({ _id: req.params.id }, fields)
    res.sendStatus(204)
  } catch (error) {
    next(httpError(500, error.message))
  }
}
