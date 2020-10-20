const mongoose = require('mongoose')

const { Schema } = mongoose

const marketSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 128,
    },
    images: [String],
    category: {
      type: String,
    },
    address: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
)
marketSchema.index({
  location: '2dsphere',
  name: 'text',
  category: 'text',
}, { unique: false })

module.exports = mongoose.model('Market', marketSchema)
