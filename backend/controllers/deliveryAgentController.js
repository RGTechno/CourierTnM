require('dotenv').config()

const DeliveryAgent = require('../models/deliveryAgentModel')
const Courier = require('../models/courierModel')
const jwt = require('jsonwebtoken')

/*
@ method: post
@ desc: login of delivery agent
@ access: public
*/
async function loginDeliveryAgent(req, res) {
  const email = req.body.email
  const password = req.body.password

  try {
    const deliveryAgent = await DeliveryAgent.findOne({
      email: email,
    })

    if (!deliveryAgent) {
      return res.status(404).json({
        status: 'failure',
        message: 'No delivery agent found with given credentials',
        data: {},
      })
    }

    const loggedInDeliveryAgent = { _id: deliveryAgent._id }
    const accessToken = jwt.sign(loggedInDeliveryAgent, process.env.JWT_SECRET)

    if (password === deliveryAgent.password) {
      const delAgent = deliveryAgent.toObject()
      delete delAgent.password
      return res.status(200).json({
        status: 'success',
        message: 'Login Success',
        data: { deliveryAgent: delAgent, accessToken },
      })
    } else {
      return res.status(401).json({
        status: 'failure',
        message: 'Incorrect Password',
        data: {},
      })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message }) // 400 => invalid user inputs
  }
}

/*
@ method: post
@ desc: add courier entry through courier _id
@ access: private
*/
async function addEntryDeliveryAgent(req, res) {
  try {
    const deliveryAgentId = req.deliveryAgent._id
    const courierId = req.body._id
    const courier = await Courier.findById(courierId)
    if (!courier) {
      return res.status(404).json({
        status: 'failure',
        message: 'Courier not found',
        data: {},
      })
    }

    if (deliveryAgentId == courier.deliveryAgent) {
      return res.status(400).json({
        status: 'failure',
        message: 'Courier already entered',
        data: {},
      })
    }

    if (courier.deliveryAgent && deliveryAgentId != courier.deliveryAgent) {
      return res.status(400).json({
        status: 'failure',
        message: 'Courier already assigned to different delivery agent',
        data: {},
      })
    }

    await Courier.findByIdAndUpdate(courierId, {
      deliveryAgent: deliveryAgentId,
      pickupDate: new Date(),
    })

    return res.status(200).json({
      status: 'success',
      message: 'Courier added for delivery',
      data: {},
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong !' })
  }
}

/*
@ method: post
@ desc: update courier as delivered
@ access: private
*/
async function markDeliveredByDeliveryAgent(req, res) {
  try {
    const deliveryAgentId = req.deliveryAgent._id
    const courierId = req.body._id
    const courier = await Courier.findById(courierId)
    if (!courier) {
      return res.status(404).json({
        status: 'failure',
        message: 'Courier not found',
        data: {},
      })
    }

    if (deliveryAgentId != courier.deliveryAgent) {
      return res.status(400).json({
        status: 'failure',
        message:
          'Courier not assigned or already assigned to different delivery agent',
        data: {},
      })
    }

    if (courier.deliveredDate) {
      return res.status(400).json({
        status: 'failure',
        message: 'Courier already delivered',
        data: {},
      })
    }

    await Courier.findByIdAndUpdate(courierId, {
      status: 'Delivered',
      deliveredDate: new Date(),
    })

    return res.status(200).json({
      status: 'success',
      message: 'Courier delivered',
      data: {},
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong !' })
  }
}

module.exports = {
  loginDeliveryAgent,
  addEntryDeliveryAgent,
  markDeliveredByDeliveryAgent,
}
