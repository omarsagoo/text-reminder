window.$ = window.jQuery = require('jquery');
let $ = require("jquery")
require('dotenv').config()


$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: window.location.href
    }).then(function (response) {
        p = "<p>name: "+ response.name
        document.getElementById("client_data").innerHTML = p
    })
})