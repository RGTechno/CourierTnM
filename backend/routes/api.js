const express = require('express')
const route = express.Router()
const DepartmentController = require('../controllers/departmentController')
const CourierController = require('../controllers/courierController')
const DeliveryAgentController = require('../controllers/deliveryAgentController')
const {
  authorize,
  authorizeDeliveryAgent,
} = require('../middleware/authorizationMiddleware')

route.get('/', (req, res) => {
  res.send('/api working')
})

//------------------ DEPARTMENT APIS -------------------------------//
route.post('/departments/addDepartment', DepartmentController.addDepartment)
route.post('/departments/loginDepartment', DepartmentController.loginDepartment)
route.get(
  '/departments/getDepartmentInfo',
  authorize,
  DepartmentController.getDepartmentProfile
)
route.patch(
  '/departments/updateDepartmentInfo',
  authorize,
  DepartmentController.updateDepartmentProfile
)

//------------------- COURIER APIS ------------------------------//
route.post('/couriers/addCourier', authorize, CourierController.addCourierEntry)
route.get('/couriers/getCouriers', authorize, CourierController.getAllCouriers)
route.get('/couriers/getCouriers/:id', CourierController.getCourierById)
route.post('/couriers/track', CourierController.getTrackingDetails)
route.patch(
  '/couriers/updateCourier',
  authorize,
  CourierController.updateCourierEntry
)

//----------------- DELIVERY AGENT APIS -------------------------//
route.post(
  '/deliveryAgents/loginDeliveryAgent',
  DeliveryAgentController.loginDeliveryAgent
)
route.post(
  '/deliveryAgents/addEntry',
  authorizeDeliveryAgent,
  DeliveryAgentController.addEntryDeliveryAgent
)
route.post(
  '/deliveryAgents/markCourierAsDelivered',
  authorizeDeliveryAgent,
  DeliveryAgentController.markDeliveredByDeliveryAgent
)

module.exports = route
