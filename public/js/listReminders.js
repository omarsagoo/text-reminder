window.$ = window.jQuery = require('jquery');
let $ = require("jquery")

$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/reminders'
    }).then(function (response) {
        var table="";
        for (i = 0; i <response.length; i++) { 
            table += "<tr><td id='rname"+ i +"'>" +
            response[i].patientName +
            "</td><td id='date"+ i +"'>" +
            response[i].date +
            "</td><td id='body"+ i +"'>" +
            response[i].body +
            "</td><td>" +
            "<button class='"+ i +" "+ response[i].uuid +"' id='reminder-delete-button'>Delete reminder</button></td></tr>"
        };
        document.getElementById("reminderTable").innerHTML += table;
        
        $("button#reminder-delete-button").click(function () {
            myClass = $(this).attr("class").split(" ")
            // console.log(myClass[1])
            formData = {
                name: document.getElementById("rname" + myClass[0]).innerText,
                body: document.getElementById("body" + myClass[0]).innerText,
                date: document.getElementById("date" + myClass[0]).innerText,
                uuid: myClass[1]
            }

            $.post("http://localhost:3000/remove/reminder", formData, function(){
                 document.location = 'listReminders.html'
            });
        })
    })
});