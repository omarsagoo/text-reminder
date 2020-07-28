window.$ = window.jQuery = require('jquery');
let $ = require("jquery")

$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/reminders'
    }).then(function (response) {
        var table =`<table id="reminderTable">
                        <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Date</th>
                        <th>Reminder</th>
                        <th>Remove</th>
                        </tr>`;
        if (response.length == 0) {
            table += "</table><table><tr><td>Nothing to show!</td></tr></table>"
        } else {
            for (i = 0; i <response.length; i++) { 
                table += "<tr><td id='lname"+ i +"'>" +
                response[i].clients[0].last_name +
                "</a></td><td id='fname" + i + "'>" +
                response[i].clients[0].first_name +
                "</td><td id='date"+ i +"'>" +
                response[i].date +
                "</td><td id='body"+ i +"'>" +
                response[i].body +
                "</td><td>" +
                "<button class='"+ i +" "+ response[i].clients[0].uuid +"' id='reminder-delete-button'>Delete reminder</button></td></tr>"
            };
        }
        document.getElementById("reminder-table").innerHTML = table +"</table>";
        
        $("button#reminder-delete-button").click(function () {
            myClass = $(this).attr("class")
            console.log(myClass)
            formData = {
                first_name: document.getElementById("fname" + myClass[0]).innerText,
                last_name: document.getElementById("lname" + myClass[0]).innerText,
                body: document.getElementById("body" + myClass[0]).innerText,
                date: document.getElementById("date" + myClass[0]).innerText,
                uuid: myClass[1]
            }

            $.post("http://localhost:3000/remove/reminder", formData, function(){
                 document.location = 'list-reminders.html'
            });
        })
    })
});