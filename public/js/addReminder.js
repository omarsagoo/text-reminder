window.$ = window.jQuery = require('jquery');
let $ = require("jquery")
require('dotenv').config()


$(function() {
    // Get the form.
    var form = $('#ajax-add-reminder');

    // Set up an event listener for the contact form.
    $(form).submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.post(process.env.PROJECT_URL + "/add/reminder", formData, function(){
            document.location = 'list-reminders.html'
        });
    });
});
