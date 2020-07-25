window.$ = window.jQuery = require('jquery');
let $ = require("jquery")

$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/patients'
    }).then(function (response) {
        var table="";
        for (i = 0; i <response.length; i++) { 
            table += "<tr><td>" +
            response[i].name +
            "</td><td>" +
            response[i].phone +
            "</td></tr>";
        };
        document.getElementById("clientTable").innerHTML += table;
    })
});