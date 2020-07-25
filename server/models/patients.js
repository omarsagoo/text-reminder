const MongoClient = require('mongodb').MongoClient;
// const Db = require('mongodb').Db;

const uri = "mongodb+srv://omar:admin1234@cluster0.uirge.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports.getPatients = async function (NPI) {
    return new Promise(async function (resolve, reject) {
        await client.connect()
        doctorDB = await client.db(NPI)
        results = await doctorDB.collection("patients").find().toArray()

       if (results.length > 0) {
           resolve(results)
       } else {
           reject()
       }
    })
}

module.exports.addPatients = async function (NPI, patient){
    return new Promise(async function (resolve, reject) {
        await client.connect()
        doctorDB = await client.db(NPI)
        result = await doctorDB.collection("patients").insertOne(patient)

        if (result) {
            resolve(result)
        } else {
            reject()
        }
    })
}