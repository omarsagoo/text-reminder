const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports.getAllReminders = async function(NPI) {
    return new Promise(async function(res, rej) {
        await client.connect()
        doctorDB = await client.db(NPI)
        results = await doctorDB.collection("reminders").find().toArray()

        if (results) {
            res(results)
        } else {
            rej()
        }
    })
}

module.exports.removeReminder = async function(NPI, reminder) {
    return new Promise(async function(res, rej) {
        await client.connect()
        doctorDB = client.db(NPI)
        result = await doctorDB.collection("reminders").deleteOne(reminder)
        console.log(result)

        if (result.deletedCount >= 1) {
            res(result)
        } else {
            rej("something went wrong")
        }
    })
}