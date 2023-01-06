const mongoose = require('mongoose')

const courierSchema = new mongoose.Schema({
  senderDetails: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Customer',
  },
  receiverDetails: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Customer',
  },
  tracker: {
    type: [
      { type: mongoose.Schema.ObjectId, required: true, ref: 'Department' },
    ],
  },
  status: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Courier', courierSchema)
