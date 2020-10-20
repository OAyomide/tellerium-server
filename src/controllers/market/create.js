const { CREATED, BAD_REQUEST } = require('http-status')
const httpError = require('http-errors')
const NodeGeocode = require('node-geocoder')
const Market = require('../../models/market')
const geocoder = NodeGeocode({ provider: 'openstreetmap' }) // because i dont have a google maps api key right now

module.exports = async (req, res, next) => {
  try {
    const geocode = await geocoder.geocode(req.body.address)
    if (geocode.length > 0) {
      res.status(BAD_REQUEST)
      next(httpError(400, 'Could not find coordinates for address after geocoding'))
      return
    }

    const { longitude, latitude } = geocode[0]
    const coordinates = [longitude, latitude]
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
