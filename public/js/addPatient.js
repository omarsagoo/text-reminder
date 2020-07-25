window.$ = window.jQuery = require('jquery');
let $ = require("jquery")


$(function() {
    // Get the form.
    var form = $('#ajax-add-patient');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();
        console.log(formData);

        // Submit the form using AJAX.
        $.post("http://localhost:3000/add/patient", formData)
    });
});
