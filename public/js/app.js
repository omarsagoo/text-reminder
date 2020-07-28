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
            "<a href='#"  +  "' class='" + response[i].uuid + "' id='patient'>" +
            response[i].name +
            "</a></td><td>" +
            response[i].phone +
            "</td><td>" +
            response[i].age +
            "</td><td>" +
            "<td><button class='"+ response[i].uuid +"' id='reminder-add-button'>Add Reminder</button></td></tr>" +
            "<td><button class='"+ response[i].uuid +"' id='patient-delete-button'>Delete patient</button></td></tr>"
        };
        document.getElementById("clientTable").innerHTML += table;
        
        $("button#patient-delete-button").click(function () {
            myClass = $(this).attr("class")

            formData = {
                uuid: myClass
            }

            $.post("http://localhost:3000/remove/patient", formData, function(){
                 document.location = 'index.html'
            });
        })

        $("a").click(async function () {
            myClass = $(this).attr("class")

            await $.getJSON("http://localhost:3000/show/patient/" + myClass, function (data) {
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

