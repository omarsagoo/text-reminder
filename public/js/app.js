window.$ = window.jQuery = require('jquery');
let $ = require("jquery")

$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/clients'
    }).then(function (response) {
        var table="";
        for (i = 0; i <response.length; i++) { 
            table += "<tr><td id='name"+ i +"'>" +
            "<a href='#"  +  "' class='" + response[i].uuid + "' id='client'>" +
            response[i].name +
            "</a></td><td>" +
            response[i].phone +
            "</td><td>" +
            response[i].age +
            "</td><td>" +
            "<button class='"+ response[i].name +" "+ response[i].uuid +"' id='reminder-add-button'>Add Reminder</button></td><td>" +
            "<button class='"+ response[i].uuid +"' id='client-delete-button'>Delete</button></td></tr>"
        };
        document.getElementById("clientTable").innerHTML += table;
        
        $("button#reminder-add-button").click(function () {
            myClass = $(this).attr("class")

            block = `<form action="/add/reminder" method="POST" id="ajax-add-reminder">

                            <label for="date">Date</label>
                            <input type="date" id="date" name="date" placeholder="Reminder Date">

                            <label for="body">Subject</label>
                            <textarea id="body" name="body" placeholder="Write something.." style="height:200px"></textarea>
                        
                            <input type="submit" value="Submit">
                            <input type="submit" value="Cancel">
                            
                        </form>`

            document.getElementById("modal-body").innerHTML = "<span class='close'>&times;</span>" + block

            var form = $('#ajax-add-reminder');

            // Set up an event listener for the contact form.
            $(form).submit(function(event) {
                // Stop the browser from submitting the form.
                event.preventDefault();
                // Serialize the form data.
                formData = $(form).serialize() + "&name=" + myClass.split(" ")[0] + "%20" +myClass.split(" ")[1]

                $.post("http://localhost:3000/add/reminder/client/"+myClass.split(" ")[2], formData, function(){
                    document.location = 'index.html'
                });
            });
             // Get the modal
             var modal = document.getElementById("myModal");
             // Get the <span> element that closes the modal
             var span = document.getElementsByClassName("close")[0];
             // When the user clicks the button, open the modal 
             modal.style.display = "block";    
             // When the user clicks on <span> (x), close the modal
             span.onclick = function() {
                 modal.style.display = "none";
             }
             // When the user clicks anywhere outside of the modal, close it
             window.onclick = function(event) {
                 if (event.target == modal) {
                 modal.style.display = "none";
                 }
             }
        })

        $("button#client-delete-button").click(function () {
            myClass = $(this).attr("class")

            formData = {
                uuid: myClass
            }

            $.post("http://localhost:3000/remove/client", formData, function(){
                 document.location = 'index.html'
            });
        })

        $("a#client").click(async function () {
            myClass = $(this).attr("class")

            $.getJSON("http://localhost:3000/client/" + myClass, function (data) {
                block = "<span class='close'>&times;</span><p>Name: " + data.name + "</p> <div class='clients'><table id='clientTable'>" +
                        `<tr>
                            <th>Date</th>
                            <th>Body</th>
                        </tr>`

                if (data.reminders.length == 0) {
                    document.getElementById("modal-body").innerHTML = block + "</table><table><tr><td>Nothing to show!</td></tr></table></div>"
                } else {
                    data.reminders.forEach((reminder, i ) => {
                        block += "<tr><td>" + reminder.date + "</td><td>" + reminder.body + "</td></tr>"
                    })
                    
                    document.getElementById("modal-body").innerHTML = block + "</table></div>"
                }
            })
            // Get the modal
            var modal = document.getElementById("myModal");
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            // When the user clicks the button, open the modal 
            modal.style.display = "block";    
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                modal.style.display = "none";
                }
            }

        })
    })
});

