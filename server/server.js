let express = require("express")
let app = express()
let patient = require("./models/patients")
let reminder = require("./models/reminders")
var bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var urlEncodedParser = bodyParser.urlencoded({extended:false})



async function main() {
    await client.connect()
    DB = await client.db("1234124")
    console.log("DB connected")

    app.use(bodyParser.json())
    app.use(express.static( '/Users/omarsagoo/dev/intensive/reminder-app/templates'));
    app.set('views', '/Users/omarsagoo/dev/intensive/reminder-app/templates');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');


    app.get("/", function (req, res) {
        
            res.render("../templates/index.html")

    })

    app.get("/patients", function (req, res)  {
            patient.getPatients(DB).then(function (response) {
                res.json(response)
            })
    })

    app.get("/reminders", function (req, res) {
        reminder.getAllReminders(DB).then(function (response) {
            res.json(response)
        })
    })

    app.post("/add/patient", urlEncodedParser ,function (req, res) {
        patient.addPatients(DB, req.body).then(function (response) {
            return res.redirect('/')
        })
    })

    app.post("/add/reminder", urlEncodedParser ,function (req, res) {
        reminder.addReminder(DB, req.body).then(function (response) {
            return res.redirect('/')
        })
    })

    app.post("/remove/patient", urlEncodedParser, function (req, res) {
        patient.removePatients(DB, req.body).then(function (response) {
            return res.redirect('/')
        })
    })

    app.post("/remove/reminder", urlEncodedParser, function (req, res) {
        reminder.removeReminder(DB, req.body).then(function (response) {
            return res.redirect('/')
        }).catch((err)=>{
            console.log(err)
        })
    })

    app.listen(3000, function() {
        console.log("Server is running on port :3000")
    })
}
main()