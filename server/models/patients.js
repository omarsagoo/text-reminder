const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports.getPatients = async function (doctorDB) {
    return new Promise(async function (resolve, reject) {
        // await client.connect()
        // DB = await client.db(NPI)
        results = await doctorDB.collection("patients").find().toArray()

       if (results.length > 0) {
           resolve(results)
       } else {
           reject()
       }
    })
}

module.exports.addPatients = async function (doctorDB, patient){
    return new Promise(async function (resolve, reject) {
        // await client.connect()
        // doctorDB = await client.db(NPI)
        result = await doctorDB.collection("patients").insertOne(patient)

        if (result) {
            resolve(result)
        } else {
            reject()
        }
    })
}

module.exports.removePatients = async function (doctorDB, patient) {
    return new Promise(async function (resolve, reject) {
        // await client.connect()
        // doctorDB = await client.db(NPI)
        result = await doctorDB.collection("patients").deleteOne(patient)

        if (result.deletedCount >= 1) {
            resolve(result)
        } else {
            reject()
        }
    })
}

module.exports.showPatient = async function (doctorDB, patientID) {
    return new Promise( async function(resolve, reject) {
        result = await doctorDB.collection("patients").findOne({uuid:patientID})
        if (result) {
            resolve(result)
        } else {
            reject()
        }
    })
}