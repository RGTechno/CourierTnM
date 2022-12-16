const Department = require('../models/department')
const {
  encryptPassword,
  decryptPassword,
} = require('../utils/password_encrypt_decrypt_helper')

async function addDepartment(req, res) {
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

  try {
    const newDepartment = await department.save()
    return res.status(201).json({
      status: 'success',
      message: 'Department added successfully',
      data: newDepartment,
    }) // 201 => creation success
  } catch (error) {
    return res.status(400).json({ message: error.message }) // 400 => invalid user inputs
  }
}

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

    const decryptedPasswordDB = await decryptPassword(
      userInputPassword,
      department.password
    )
    if (decryptedPasswordDB) {
      return res.status(200).json({
        status: 'success',
        message: 'Login Success',
        data: department,
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

module.exports = {
  addDepartment,
  loginDepartment,
}
