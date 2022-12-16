const express = require('express')
const route = express.Router()
const DepartmentController = require('../controllers/departmentController')

route.get('/', (req, res) => {
  res.send('/api working')
})

route.post('/addDepartment', DepartmentController.addDepartment)
route.post('/loginDepartment', DepartmentController.loginDepartment)

module.exports = route
