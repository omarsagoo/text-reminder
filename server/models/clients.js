module.exports.getClients = async function (DB) {
    return new Promise(async function (resolve, reject) {
        results = await DB.collection("clients").find().toArray()

       if (results.length >= 0) {
           resolve(results)
       } else {
           reject("something went wrong")
       }
    })
}

module.exports.addClient = async function (DB, client){
    return new Promise(async function (resolve, reject) {
        result = await DB.collection("clients").insertOne(client)

        if (result) {
            resolve(result)
        } else {
            reject("something went wrong")
        }
    })
}

module.exports.removeClient = async function (DB, client) {
    return new Promise(async function (resolve, reject) {
        result = await DB.collection("clients").deleteOne(client)

        allReminders = await DB.collection("reminders").deleteMany(client)

        if (result.deletedCount >= 1) {
            resolve(result)
        } else {
            reject("something went wrong")
        }
    })
}

module.exports.showClient = async function (DB, clientID) {
    return new Promise( async function(resolve, reject) {
        result = await DB.collection("clients").findOne({uuid:clientID})
        if (result) {
            resolve(result)
        } else {
            reject("something went wrong")
        }
    })
}