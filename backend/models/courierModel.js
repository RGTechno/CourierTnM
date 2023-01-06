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
  packageName: {
    type: String,
    required: true,
  },
  packageWeight: {
    type: String,
    required: true,
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
  createdDate: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Courier', courierSchema)
