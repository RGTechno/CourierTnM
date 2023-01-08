const Courier = require('../models/courierModel')
const Department = require('../models/departmentModel')
const Customer = require('../models/customerModel')

/*
@ method: post
@ desc: adding a courier by the logged in department either initialiser or in transit agencies
@ access: private
*/
async function addCourierEntry(req, res) {
  try {
    const departmentId = req.department._id // this is the id of loggedin department who is currently making the entry of this courier to their department (can be initiator as well as middle ones)
    const department = await Department.findById(departmentId).select(
      '-password'
    )

    const courierDetails = req.body.courierDetails
    const existingCourier = await Courier.findById(courierDetails._id)
    if (existingCourier) {
      // if courier exist already that means this courier department is the middle one in courier transit journey
      // change status and all etc. functionalities
      if (Object.values(existingCourier.tracker).includes(departmentId)) {
        return res.status(400).json({
          status: 'failure',
          message: 'Courier already entered',
          data: existingCourier,
        })
      }

      const midStatus = `Package arrived at ${department.name}, ${department.location}, ${department.city}`

      var getDate = Date.now().toString()
      existingCourier.tracker[getDate] = departmentId
      const courier = await Courier.findByIdAndUpdate(courierDetails._id, {
        tracker: existingCourier.tracker,
        status: midStatus,
        updatedAt: Date.now(),
      })

      return res.status(204).json({
        status: 'success',
        message: 'Courier Entry Successful',
        data: courier,
      })
    } else {
      // brand new courier no receiver/sender details yet so create one from req

      const sender = req.body.senderDetails
      const senderDetails = await Customer.findOne({
        email: sender.email,
      })
      if (!senderDetails) {
        senderDetails = await new Customer(sender).save()
      }

      const receiver = req.body.receiverDetails
      const receiverDetails = await Customer.findOne({
        email: receiver.email,
      })
      if (!receiverDetails) {
        receiverDetails = await new Customer(sender).save()
      }

      const initialStatus = `Packed at ${department.name}, ${department.location}, ${department.city}`
      var getDate = Date.now().toString()
      const trackerObject = {}
      trackerObject[getDate] = departmentId
      const initialTracker = trackerObject

      const courier = await new Courier({
        senderDetails: senderDetails._id,
        receiverDetails: receiverDetails._id,
        packageName: courierDetails.packageName,
        packageWeight: courierDetails.packageWeight,
        status: initialStatus,
        tracker: initialTracker,
      }).save()

      return res.status(201).json({
        status: 'success',
        message: 'Courier Entry Successful',
        data: courier,
      })
    }
  } catch (error) {
    // console.log(error.message)
    return res.status(500).json({ message: 'Something went wrong !' })
  }
}

/*
@ method: get
@ desc: get all couriers for a department
@ access: private
*/
async function getAllCouriers(req, res) {
  try {
    var departmentId = req.department._id
    var allCouriers = await Courier.find()
      .populate('senderDetails')
      .populate('receiverDetails')

    const resultingAllDepartmentCouriers = []

    for (const courier of allCouriers) {
      if (Object.values(courier.tracker).includes(departmentId)) {
        resultingAllDepartmentCouriers.push(courier)
      }
    }

    return res.status(200).json({
      status: 'success',
      message: 'Couriers Fetched Successful',
      data: resultingAllDepartmentCouriers,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Something went wrong !' })
  }
}

/*
@ method: get
@ desc: get courier by id
@ access: private
*/
async function getCourierById(req, res) {
  try {
    const courierId = req.params.id
    const courier = await Courier.findById(courierId)
      .populate('senderDetails')
      .populate('receiverDetails')

    if (!courier) {
      return res.status(404).json({
        status: 'failure',
        message: 'Courier not found',
        data: {},
      })
    }

    return res.status(200).json({
      status: 'success',
      message: 'Courier Fetched Successfully',
      data: courier,
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong !' })
  }
}

/*
@ method: post
@ desc: get courier by id tracking
@ access: public
*/
async function getTrackingDetails(req, res) {
  try {
    const courierId = req.body._id
    const courier = await Courier.findById(courierId).populate('tracker', {
      password: 0,
    })

    if (!courier) {
      return res.status(404).json({
        status: 'failure',
        message: 'Courier not found',
        data: {},
      })
    }

    return res.status(200).json({
      status: 'success',
      message: 'Courier tracked successfully',
      data: courier.tracker,
    })
  } catch (error) {
    console.log(error.message)
    return res
      .status(500)
      .json({ message: 'Something went wrong / Invalid tracking id !' })
  }
}

module.exports = {
  addCourierEntry,
  getAllCouriers,
  getCourierById,
  getTrackingDetails,
}
