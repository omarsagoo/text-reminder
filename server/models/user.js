module.exports.addUserToDB = async function (client, user) {
    return new Promise(async (res, rej) => {
        allUserDB = await client.db("reminderApp")
        result = await allUserDB.collection("users").insertOne(user)
        userDB = await client.db(user.username)
        clientColl = await userDB.createCollection("clients")
        reminderColl = await userDB.createCollection("reminders")

        if (result) {
            res(result)
        } else {
            rej("addUser: Something went wrong")
        }
    })
}

module.exports.checkIFUserInDB = async function (userDB, user) {
    return new Promise(async (res, rej) => {
        result = await userDB.collection("users").findOne({username:user})
        if (result) {
            res(true)
        } else {
            rej(false)
        }
    })
}