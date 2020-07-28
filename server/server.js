let express = require("express")
let app = express()
let allClients = require("./models/clients")
let reminder = require("./models/reminders")
let users = require("./models/user")
let bcrypt = require("bcrypt")

var bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var urlEncodedParser = bodyParser.urlencoded({extended:false})



async function main() {
    await client.connect()
    let DB = null
    console.log("DB connected")

    app.use(bodyParser.json())
    app.use(express.static( '/Users/omarsagoo/dev/intensive/reminder-app/templates'));
    app.set('views', '/Users/omarsagoo/dev/intensive/reminder-app/templates');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');


    app.get("/", function (req, res) {
            res.render("../templates/index.html")
    })

    app.get("/clients", function (req, res)  {
            allClients.getClients(DB).then(function (response) {
                res.json(response)
            }).catch((err) => {
                console.log("/clients: ", err)
            })
    })

    app.get("/reminders", function (req, res) {
        reminder.getAllReminders(DB).then(function (response) {
            res.json(response)
        }).catch((err) => {
            console.log("/reminders: ", err)
        })
    })

    app.get("/client/:id", function(req, res) {
        allClients.showClient(DB, req.params.id).then(function (response) {
            res.json(response)
        }).catch((err) => {
            console.log("/show/client/:id: ", err)
        })
    })

    app.get("/check/user/:id", async function (req, res) {
        userDB = await client.db("reminderApp")
        users.checkIFUserInDB(userDB, req.params.id).then((response) => {
            res.json({val: response})
        }).catch((err) => {
            res.json({val: err})
        })
    })

    app.post("/add/user", urlEncodedParser, async function (req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.pass, 10)
            const user = {username: req.body.user, pass: hashedPassword}
            
            users.addUserToDB(client, user).then((response) => {
                res.send("success")
            }).catch((err) => {
                res.send("failure")
            })
        } catch {
            res.status(500).send()
        }
    })

    app.post("/users/login", urlEncodedParser, async function (req, res) {
        usersCol = await client.db("reminderApp").collection("users")

        user = await usersCol.findOne({username:req.body.user})

            if (user == null) {
                return res.status(400).send("Cannot find user")
            }
            try {
                if (await bcrypt.compare(req.body.pass, user.pass)) {
                    DB = await client.db(req.body.user)
                    res.send(true)
                } else {
                    res.send(false)
                }
            } catch {
                res.status(500).send()
            }
    })

    app.post("/add/client", urlEncodedParser ,function (req, res) {
        req.body.reminders = []
        allClients.addClient(DB, req.body).then(function (response) {
            return res.redirect('/')
        }).catch((err) => {
            console.log("/add/clients: ", err)
        })
    })

    app.post("/add/reminder", urlEncodedParser ,function (req, res) {
        reminder.addReminder(DB, req.body).then(function (response) {
            return res.redirect('/')
        }).catch((err) => {
            console.log("/add/reminder: ", err)
        })
    })

    app.post("/remove/client", urlEncodedParser, function (req, res) {
        allClients.removeClient(DB, req.body).then(function (response) {
            return res.redirect('/')
        }).catch((err) => {
            console.log("/remove/client: ", err)
        })
    })

    app.post("/remove/reminder", urlEncodedParser, function (req, res) {
        reminder.removeReminder(DB, req.body).then(function (response) {
            return res.redirect('/')
        }).catch((err)=>{
            console.log("/remove/reminder: ", err)
        })
    })

    app.post("/add/reminder/client/:id", urlEncodedParser, function (req, res) {
        reminder.addReminderToClientAndRemindersColl(DB, req.params.id, req.body).then(async function (response) {
            await client.db("reminderApp").collection("reminders").insertOne(response)
            return res.redirect('/')
        }) .catch((err) => {
            console.log("/add/reminder/clients: ", err)
        })
    })

    app.listen(3000, function() {
        console.log("Server is running on port :3000")
    })
}
main()