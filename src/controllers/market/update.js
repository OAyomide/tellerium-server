const httpError = require('http-errors')
const Market = require('../../models/market')
const NodeGeocode = require('node-geocoder')
const { BAD_REQUEST } = require('http-status')
const geocoder = NodeGeocode({ provider: 'openstreetmap' })


module.exports = async (req, res, next) => {
  try {
    const fields = {
      ...req.body,
    }
    const { address } = req.body
    if (address) {
      const geocode = await geocoder.geocode(req.body.address)
      if (geocode.length === 0) {
        res.status(BAD_REQUEST)
        next(httpError(BAD_REQUEST, 'Could not find coordinates for address'))
        return
      }
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
