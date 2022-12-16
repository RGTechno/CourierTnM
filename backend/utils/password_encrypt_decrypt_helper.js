const bcrypt = require('bcrypt')

const saltRounds = 10

async function encryptPassword(rawUserInputPassword) {
  try {
    const hashedPass = bcrypt.hash(rawUserInputPassword, saltRounds)
    return hashedPass
  } catch (error) {
    console.log(error)
    return null
  }
}

async function decryptPassword(rawUserInputPassword, hashedPassword) {
  try {
    const compare = await bcrypt.compare(rawUserInputPassword, hashedPassword)
    return compare
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = {
  encryptPassword,
  decryptPassword,
}
