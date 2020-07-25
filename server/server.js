let express = require("express")
let app = express()
let patient = require("./models/patients")
var bodyParser = require("body-parser");


app.use(bodyParser.json())

app.get("/patients", function (req, res)  {
    patient.getPatients("1234124").then(function (response) {
        res.json(response)
    })
})

app.post("/add/patient", function (req, res) {
    console.log("here!", req.body)
    // body = req.body
    // console.log(body)
    // patient.addPatients("1234124", )
})

app.get("/", function (req, res) {
    res.render("../templates/index.html")
})

app.listen(3000, function() {
    console.log("Server is running on port :3000")
})