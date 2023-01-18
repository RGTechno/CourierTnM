require('dotenv').config()
const jwt = require('jsonwebtoken')

function authorizeToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.status(401).json({
      status: 'failure',
      message: 'Unauthorized',
      data: {},
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, departmentInfo) => {
    if (err) {
      return res.status(403).json({
        status: 'failure',
        message: 'Invalid access token',
        data: {},
      })
    }
    req.department = departmentInfo
    next()
  })
}

function authorizeDeliveryAgentToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.status(401).json({
      status: 'failure',
      message: 'Unauthorized',
      data: {},
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, deliveryAgentInfo) => {
    if (err) {
      return res.status(403).json({
        status: 'failure',
        message: 'Invalid access token',
        data: {},
      })
    }
    req.deliveryAgent = deliveryAgentInfo
    next()
  })
}

module.exports = {
  authorize: authorizeToken,
  authorizeDeliveryAgent: authorizeDeliveryAgentToken,
}
