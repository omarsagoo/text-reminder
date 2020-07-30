window.$ = window.jQuery = require('jquery');
let $ = require("jquery")
require('dotenv').config()


$(document).ready(function () {
    var form = $('#add-user-form');

    $(form).submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

        formDataArray = $(form).serializeArray()

        if (formDataArray[1].value == formDataArray[2].value) {
            user = {
                user: formDataArray[0].value,
                pass:formDataArray[1].value
            }
            $.getJSON(process.env.PROJECT_URL + "/check/user/"+ formDataArray[0].value, function (data) {
                if (data.val == false) {
                    $.post(process.env.PROJECT_URL + "/add/user", user, function () {
                        document.location = "login.html"
                    })
                } else {
                    block = `<div class="alert"><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                        <strong>Danger!</strong> A user with that name already exists.</div>`
                    document.getElementById("alert-signup").innerHTML = block
                }
            })

        } else {
            block = `<div class="alert"><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
            <strong>Danger!</strong> Passwords do not match.</div>`
            document.getElementById("alert-signup").innerHTML = block
        }
    });
})