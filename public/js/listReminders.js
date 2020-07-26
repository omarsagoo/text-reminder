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
            "<button class='"+ i +"' id='reminder-delete-button'>Delete reminder</button></td></tr>"
        };
        document.getElementById("reminderTable").innerHTML += table;
        
        $("button#reminder-delete-button").click(function () {
            myClass = $(this).attr("class")
            
            formData = {
                patientName: document.getElementById("rname" + myClass).innerText,
                body: document.getElementById("body" + myClass).innerText,
                date: document.getElementById("date" + myClass).innerText
            }

            $.post("http://localhost:3000/remove/reminder", formData, function(){
                 document.location = 'listReminders.html'
            });
        })
    })
});