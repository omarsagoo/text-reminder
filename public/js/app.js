window.$ = window.jQuery = require('jquery');
let $ = require("jquery")

$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/patients'
    }).then(function (response) {
        var table="";
        for (i = 0; i <response.length; i++) { 
            table += "<tr><td id='name"+ i +"'>" +
            response[i].name +
            "</td><td id='phone"+ i +"'>" +
            response[i].phone +
            "</td><td id='age"+ i +"'>" +
            response[i].age +
            "</td><td>" +
            "<button class='"+ i +"' id='delete-button'>Delete patient</button></td></tr>"
        };
        document.getElementById("clientTable").innerHTML += table;
        
        $("button").click(function () {
            myClass = $(this).attr("class")
            
            formData = {
                name: document.getElementById("name" + myClass).innerText,
                phone: document.getElementById("phone" + myClass).innerText,
                age: document.getElementById("age" + myClass).innerText
            }
            
            $.post("http://localhost:3000/remove/patient", formData, function(){
                 document.location = 'index.html'
            });
        })
    })
});