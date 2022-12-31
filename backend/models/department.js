const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    default: 'New Delhi',
  },
  state: {
    type: String,
    required: true,
    default: 'Delhi',
  },
  pinCode: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
    default: 'India',
  },
})

module.exports = mongoose.model('Department', departmentSchema)
