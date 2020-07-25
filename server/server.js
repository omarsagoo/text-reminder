let express = require("express")
let app = express()
let patient = require("./models/patients")
var bodyParser = require("body-parser");

var urlEncodedParser = bodyParser.urlencoded({extended:false})

app.use(bodyParser.json())
app.use(express.static( '/Users/omarsagoo/dev/intensive/reminder-app/templates'));
app.set('views', '/Users/omarsagoo/dev/intensive/reminder-app/templates');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/patients", function (req, res)  {
    patient.getPatients("1234124").then(function (response) {
        res.json(response)
    })
})

app.post("/add/patient", urlEncodedParser ,function (req, res) {
    console.log("here!", req.body)
    patient.addPatients("1234124", req.body).then(function (response) {
        console.log(response)
        return res.redirect('/')
    })
})

app.get("/", function (req, res) {
    res.render("../templates/index.html")
})

app.listen(3000, function() {
    console.log("Server is running on port :3000")
})