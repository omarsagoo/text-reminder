const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports.getAllReminders = async function(doctorDB) {
    return new Promise(async function(res, rej) {
        // await client.connect()
        // doctorDB = await client.db(NPI)
        results = await doctorDB.collection("reminders").find().toArray()

        if (results) {
            res(results)
        } else {
            rej()
        }
    })
}

module.exports.removeReminder = async function(doctorDB, reminder) {
    return new Promise(async function(res, rej) {
        // await client.connect()
        // doctorDB = client.db(NPI)
        result = await doctorDB.collection("reminders").deleteOne(reminder)

        if (result.deletedCount >= 1) {
            res(result)
        } else {
            rej("something went wrong")
        }
    })
}

module.exports.addReminder = async function(doctorDB, reminder) {
    return new Promise(async function(res, rej) {
        // await client.connect()
        // doctorDB = client.db(NPI)
        result = await doctorDB.collection("reminders").insertOne(reminder)

        if (result) {
            res(result)
        } else {
            rej("something went wrong")
        }
    })
}