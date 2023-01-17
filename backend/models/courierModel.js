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
    type: Object,
    of: { type: mongoose.Schema.ObjectId, required: true, ref: 'Department' },
  },
  departmentStatus: {
    type: Object,     // {depId:status}
    required: true,  // accepted, out of delivery, dispatched, unsuccessful, delivered
  },
  status: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Courier', courierSchema)
