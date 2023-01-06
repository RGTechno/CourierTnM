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
      //TODO: if courier exist already that means this courier department is the middle one in courier transit journey
      //TODO: change status and all etc. functionalities
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
      const initialTracker = [departmentId]

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
    return res.status(500).json({ message: 'Something went wrong !' })
  }
}

module.exports = {
  addCourierEntry,
}
