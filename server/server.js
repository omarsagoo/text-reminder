let express = require("express")
let app = express()
let patient = require("./models/patients")
let reminder = require("./models/reminders")
var bodyParser = require("body-parser");

var urlEncodedParser = bodyParser.urlencoded({extended:false})

app.use(bodyParser.json())
app.use(express.static( '/Users/omarsagoo/dev/intensive/reminder-app/templates'));
app.set('views', '/Users/omarsagoo/dev/intensive/reminder-app/templates');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get("/", function (req, res) {
    res.render("../templates/index.html")
})

app.get("/patients", function (req, res)  {
    patient.getPatients("1234124").then(function (response) {
        res.json(response)
    })
})

app.get("/reminders", function (req, res) {
    reminder.getAllReminders("1234124").then(function (response) {
        res.json(response)
    })
})

app.post("/add/patient", urlEncodedParser ,function (req, res) {
    patient.addPatients("1234124", req.body).then(function (response) {
        return res.redirect('/')
    })
})

app.post("/remove/patient", urlEncodedParser, function (req, res) {
    patient.removePatients("1234124", req.body).then(function (response) {
        return res.redirect('/')
    })
})

app.post("/remove/reminder", urlEncodedParser, function (req, res) {
    console.log(req.body)
    reminder.removeReminder("1234124", req.body).then(function (response) {
        return res.redirect('/')
    }).catch((err)=>{
        console.log(err)
    })
})

app.listen(3000, function() {
    console.log("Server is running on port :3000")
})