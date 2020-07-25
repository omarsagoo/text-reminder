const MongoClient = require('mongodb').MongoClient;
// const Db = require('mongodb').Db;

const uri = "mongodb+srv://omar:admin1234@cluster0.uirge.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function main(){
    dr = {
        name: "Dr. Doctorson",
        NPI: "1234124"
    }
    pt = {
        name: "omar Sagoo", 
        age: "23"
    }
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const doctors = client.db("doctors")
        const allDoctors = doctors.collection("doctors")
        
        // Make the appropriate DB calls
        // await addPatientToDoctor("1234124")
        // await createDoctorDatabaseAndAddDoctorToAllDoctors("1234124", dr, allDoctors, doctors)
        // await addPatientToDoctor(pt, "1234124", allDoctors)
        await findPatient("1234124", "omar", allDoctors)
 
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
