require('dotenv').config()

const Department = require('../models/departmentModel')
const {
  encryptPassword,
  decryptPassword,
} = require('../utils/password_encrypt_decrypt_helper')
const jwt = require('jsonwebtoken')

/*
@ method: post
@ desc: registration of courier agency
@ access: public
*/
async function addDepartment(req, res) {
  try {
    const departmentExist = await Department.findOne({
      registrationNumber: req.body.registrationNumber,
    })
    if (departmentExist) {
      return res.status(400).json({
        status: 'failure',
        message: 'Department with given registration number already exists',
        data: {},
      })
    }
    if (!req.body.password) {
      return res.status(400).json({
        status: 'failure',
        message: 'Invalid Password Input',
        data: {},
      })
    }
    const securePassword = await encryptPassword(req.body.password)
    if (securePassword === null) {
      return res.status(500).json({
        status: 'failure',
        message: 'Password Encryption failed',
        data: {},
      })
    }
    const department = new Department({
      name: req.body.name,
      location: req.body.location,
      registrationNumber: req.body.registrationNumber,
      contactEmail: req.body.contactEmail,
      contactNumber: req.body.contactNumber,
      password: securePassword,
      city: req.body.city,
      state: req.body.state,
      pinCode: req.body.pinCode,
      country: req.body.country,
    })

    const newDepartment = await department.save()

    const loggedInDepartment = { _id: department._id }
    const accessToken = jwt.sign(loggedInDepartment, process.env.JWT_SECRET)

    return res.status(201).json({
      status: 'success',
      message: 'Department added successfully',
      data: { accessToken },
    }) // 201 => creation success
  } catch (error) {
    return res.status(400).json({ message: error.message }) // 400 => invalid user inputs
  }
}

/*
@ method: post
@ desc: login of courier agency
@ access: public
*/
async function loginDepartment(req, res) {
  const regNo = req.body.registrationNumber
  const userInputPassword = req.body.password

  try {
    const department = await Department.findOne({
      registrationNumber: regNo,
    })

    if (!department) {
      return res.status(404).json({
        status: 'failure',
        message: 'No department found with given credentials',
        data: {},
      })
    }

    const loggedInDepartment = { _id: department._id }
    const accessToken = jwt.sign(loggedInDepartment, process.env.JWT_SECRET)

    const decryptedPasswordDB = await decryptPassword(
      userInputPassword,
      department.password
    )

    if (decryptedPasswordDB) {
      return res.status(200).json({
        status: 'success',
        message: 'Login Success',
        data: { accessToken },
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
@ method: get
@ desc: profile of courier agency
@ access: private
*/
async function getDepartmentProfile(req, res) {
  try {
    const departmentId = req.department._id
    const department = await Department.findById(departmentId).select(
      '-password'
    )
    if (department) {
      return res.status(200).json({
        status: 'success',
        message: 'Department found successfully',
        data: department,
      })
    }

    return res.status(404).json({
      status: 'failure',
      message: 'Department not found',
      data: {},
    })
  } catch (error) {
    return new Error(error.message)
  }
}

/*
@ method: patch
@ desc: update profile of courier agency
@ access: private
*/
async function updateDepartmentProfile(req, res) {
  try {
    const departmentId = req.department._id
    const currentDepartment = await Department.findByIdAndUpdate(
      departmentId,
      req.body
    )

    const updatedDepartment = await Department.findById(
      currentDepartment._id
    ).select('-password')

    if (updatedDepartment) {
      return res.status(200).json({
        status: 'success',
        message: 'updated successfully',
        data: updatedDepartment,
      })
    }

    return res.status(404).json({
      status: 'failure',
      message: 'Department not found',
      data: {},
    })
  } catch (error) {
    return new Error(error.message)
  }
}

module.exports = {
  addDepartment,
  loginDepartment,
  getDepartmentProfile,
  updateDepartmentProfile,
}
