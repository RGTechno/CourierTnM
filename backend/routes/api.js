const express = require('express')
const route = express.Router()
const DepartmentController = require('../controllers/departmentController')
const { authorize } = require('../middleware/authorizationMiddleware')

route.get('/', (req, res) => {
  res.send('/api working')
})

//------------------ DEPARTMENT APIS -------------------------------//
route.post('/addDepartment', DepartmentController.addDepartment)
route.post('/loginDepartment', DepartmentController.loginDepartment)
route.get(
  '/getDepartmentInfo',
  authorize,
  DepartmentController.getDepartmentProfile
)
route.patch("/updateDepartmentInfo",authorize,DepartmentController.updateDepartmentProfile)

module.exports = route
