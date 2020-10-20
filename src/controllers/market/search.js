const httpError = require('http-errors')
const Market = require('../../models/market')

module.exports = async (req, res, next) => {
  const {
    name,
    category,
    nearest,
    userCoordinates,
    maxDistance, // in meters
  } = req.query

  const fields = {
    name: {
      $regex: new RegExp(name, 'gi'),
    },
    category: {
      $regex: new RegExp(category, 'gi'),
    },
  }

  if (nearest === 'true' && userCoordinates) {
    const userLocation = {
      type: 'Point',
      coordinates: JSON.parse(userCoordinates),
    }

    fields.location = {
      $near: {
        $geometry: userLocation,
        $maxDistance: maxDistance || 1000,
      },
    }
  }

  try {
    const markets = await Market.find(fields).lean()
    res.json(markets)
  } catch (error) {
    next(httpError(400, error.message))
  }
}
