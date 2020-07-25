const MongoClient = require('mongodb').MongoClient;
require("dotenv").config()

const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function main(){
    dr = {
        name: "Dr. Doctorson",
        NPI: "1234124"
    }
    pt = {
        name: "Max Shi", 
        age: "23",
        phone: "555555555",
        reminders: []
    }
    rm = {
        body:"reminder at this day",
        date: "10/10/2020",
        patientName: "omar Sagoo"
    }
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const doctors = client.db("doctors")
        const allDoctors = doctors.collection("doctors")
        
        // Make the appropriate DB calls
        // await createDoctorDatabaseAndAddDoctorToAllDoctors("1234124", dr, allDoctors, doctors)
        // await addPatientToDoctor(pt, "1234124", allDoctors)
        // patient = await findPatient("1234124", "Max", allDoctors)
        // await addReminderToPatientAndRemindersCol("1234124", rm, patient[0]._id, allDoctors)
        await listReminders("1234124", allDoctors)
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

// creates a new database to stor information to be used by the doctor
// also adds the doctor into a list of all the doctors
async function createDoctorDatabaseAndAddDoctorToAllDoctors(NPI, dr, allDoctorsCollection, database){
    doctorDB = client.db(NPI)
    col = await doctorDB.createCollection("patients")
    await doctorDB.createCollection("reminders")

    await allDoctorsCollection.insertOne(dr)
};

// finds a patient using the NPI of the doctor, and the patient name
async function findPatient(NPI, patientName, allDoctorsCollection){
    doctorInCol = await allDoctorsCollection.findOne({NPI:NPI})
    results = null

    if (doctorInCol) {
        doctorDB = await client.db(NPI)
        results = await doctorDB.collection("patients").find({name:{'$regex': patientName}}).toArray()
    }

    if (results.length > 0) {
        console.log(`Found a patient:`);
        results.forEach((result, i) => {
            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
        })

        return results
    } else {
        console.log(`No Doctors found with the NPI '${NPI}'`);
        return null
    }
}

// Adds a patient to the doctors patients collection
async function addPatientToDoctor(patient, NPI, allDoctorsCollection) {
    doctorInCol = await allDoctorsCollection.findOne({NPI:NPI})
    result = null

    if (doctorInCol) {
        doctorDB = await client.db(NPI)
        result = await doctorDB.collection("patients").insertOne(patient)
    }
    
    if (result) {
        console.log(`Succesfully added ${patient.name} to ${NPI} database`)
    } else {
        console.log("error")
    }
}

// adds a reminder to the doctors reminders collection
// also adds reminder to the patients reminder list.
async function addReminderToPatientAndRemindersCol(NPI, reminder, patientID, allDoctorsCollection){
    doctorInCol = await allDoctorsCollection.findOne({NPI:NPI})
    result = null

    if (doctorInCol) {
        doctorDB = await client.db(NPI)
        await doctorDB.collection("reminders").insertOne(reminder)
        patient = await doctorDB.collection("patients").findOne({_id: patientID})

        await doctorDB.collection("patients").updateOne({_id: patientID}, {$push:{reminders: reminder}})
    }
}

async function listPatients(NPI, allDoctorsCollection){
    doctorInCol = await allDoctorsCollection.findOne({NPI:NPI})
    results = null

    if (doctorInCol) {
        doctorDB = await client.db(NPI)
        results = await doctorDB.collection("patients").find().toArray()
    }
    return results
}

async function listReminders(NPI, allDoctorsCollection) {
    doctorInCol = await allDoctorsCollection.findOne({NPI:NPI})
    results = null

    if (doctorInCol) {
        doctorDB = await client.db(NPI)
        results = await doctorDB.collection("reminders").find().toArray()
    }

    return results
}