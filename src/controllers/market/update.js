const httpError = require('http-errors')
const Market = require('../../models/market')
const NodeGeocode = require('node-geocoder')
const geocoder = NodeGeocode({ provider: 'openstreetmap' })


module.exports = async (req, res, next) => {
  try {
    const fields = {
      ...req.body,
    }
    const { address } = req.body
    if (address) {
      const geocode = await geocoder.geocode(req.body.address)
      const { longitude, latitude } = geocode[0]
      const coordinates = [longitude, latitude]

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
