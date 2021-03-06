window.$ = window.jQuery = require('jquery');
let $ = require("jquery")
const {session} = require('electron')
require('dotenv').config()


$(document).ready(function () {
    var form = $('#ajax-login-form');
    $(form).submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

        // Serialize the form data.
        var formDataArray = $(form).serializeArray();
        document.cookie = "user=" + formDataArray[0].value
        console.log(document.cookie)
        $.getJSON(process.env.PROJECT_URL + "/check/user/"+ formDataArray[0].value, function (data) {
            if (data.val) {
                user = {
                    user: formDataArray[0].value,
                    pass: formDataArray[1].value
                }
                $.post(process.env.PROJECT_URL + "/users/login", user, function (data) {
                    if (data) {
                        document.location = "index.html"
                    } else {
                        block = `<div class="alert"><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                                    <strong>Danger!</strong> Incorrect username or password.</div>`
                        document.getElementById("alert-signup").innerHTML = block
                    }
                })
            } else {
                block = `<div class="alert"><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                            <strong>Danger!</strong> Incorrect username or password.</div>`
                document.getElementById("alert-signup").innerHTML = block
            }
        })
    });
})
