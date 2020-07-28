module.exports.getAllReminders = async function(DB) {
    return new Promise(async function(res, rej) {
        results = await DB.collection("reminders").find().toArray()

        if (results) {
            res(results)
        } else {
            rej("something went wrong")
        }
    })
}

module.exports.removeReminder = async function(DB, reminder) {
    return new Promise(async function(res, rej) {
        clientInfo = await DB.collection("clients").findOneAndUpdate({uuid: reminder.uuid}, {$pull: {reminders: reminder}})

        result = await DB.collection("reminders").deleteOne(reminder)
        
        if (result.deletedCount >= 1) {
            res(result)
        } else {
            rej("something went wrong")
        }
    })
}

module.exports.addReminder = async function(DB, reminder) {
    return new Promise(async function(res, rej) {
        result = await DB.collection("reminders").insertOne(reminder)

        if (result) {
            res(result)
        } else {
            rej("something went wrong")
        }
    })
}

module.exports.addReminderToClientAndRemindersColl = async function(DB, clientID, reminder){
    return new Promise(async function(resolve, reject) {
        result = await DB.collection("clients").findOneAndUpdate({uuid: clientID}, {$push:{reminders: reminder}})
        if(reminder.type == "phone") {
            reminder.sendTo = result.value.phone
        } else {
            reminder.sendTo = result.value.email
        }
        reminderClient = await DB.collection("reminders").insertOne(reminder)

        if (reminderClient && result) {
            resolve(result)
        } else if (!result) {
            reject("result: something went wrong")
        } else {
            reject("reminder: somehting went wrong")
        }
    })
}