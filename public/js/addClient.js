window.$ = window.jQuery = require('jquery');
let $ = require("jquery")


$(function() {
    // Get the form.
    var form = $('#ajax-add-client');

    // Set up an event listener for the contact form.
    $(form).submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

    
        // Serialize the form data.
        var formData = $(form).serialize();

        formData += "&uuid=" + uuidv4()

        // Submit the form using AJAX.
        $.post("http://localhost:3000/add/client", formData, function(){
            document.location = 'index.html'
        });
    });
});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }