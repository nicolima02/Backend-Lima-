const twilio = require('twilio')
const dotenv = require('dotenv')
dotenv.config()

const twilioClient = twilio(process.env.SID, process.env.AUTH)

module.exports = twilioClient