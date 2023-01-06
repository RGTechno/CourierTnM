const express = require('express')
const route = express.Router()
const DepartmentController = require('../controllers/departmentController')
const CourierController = require('../controllers/courierController')
const { authorize } = require('../middleware/authorizationMiddleware')

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

module.exports = route
