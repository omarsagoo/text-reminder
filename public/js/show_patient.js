window.$ = window.jQuery = require('jquery');
let $ = require("jquery")

$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: window.location.href
    }).then(function (response) {
        p = "<p>name: "+ response.name
        document.getElementById("patient_data").innerHTML = p
    })
})