const mongoose = require('mongoose')

const courierSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  senderAddress: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  receiverAddress: {
    type: String,
    required: true,
  },
  receiverCity: {
    type: String,
    required: true,
  },
  receiverState: {
    type: String,
    required: true,
  },
  receiverPincode: {
    type: String,
    required: true,
  },
  receiverCountry: {
    type: String,
    required: true,
  },
  tracker: {
    type: Array,
  },
  status: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Courier', courierSchema) 
