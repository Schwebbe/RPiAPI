//Denna kod skriver ut JSON datan från databasen i ett table
$(document).ready(function() {
    $.getJSON("http://localhost:3000/customers", function(data) {
        var json = data;
        var tr;
        for (var i = 0; i < json.length; i++) {
            tr = $('<tr/>');
            tr.append("<td class='id centertxt'>" + json[i]._id + "</td>");
            tr.append("<td class='centertxt'>" + json[i].firstname + "</td>");
            tr.append("<td class='centertxt'>" + json[i].lastname + "</td>");
            tr.append("<td class='centertxt'>" + json[i].Gender + "</td>");
            tr.append("<td class='centertxt'>" + json[i].address + "</td>");
            tr.append("<td class='centertxt'>" + json[i].email + "</td>");
            tr.append("<button type='button' class='del btn btn-outline-danger my-2 my-sm-0'><td>" + "Delete" + "</td></button>");
            tr.append("<button type='button' data-toggle='modal' data-target='#myModal' class='btn btn-outline-warning my-2 my-sm-0'><td>" +   "Update" + "</td></button>");
            $('table').append(tr);
           
            //Delete knapp för varje kolumn
            $('.del').click(function() {
                // Pull out ID.
                var row = $(this).closest("tr"); // Find the row.
                var text = row.find(".id").text(); // Find the row's content (ID).
                //Ajax delete funktion, HTML har bara post och get
                $.ajax({ 
                    type: 'DELETE',
                    url: 'http://localhost:3000/customers/' + text
                });
                window.location.reload();
            });
        };
    });
});

var RPiAPI = "https://api.themoviedb.org/3/tv/top_rated?api_key=18034db0bd94fb6a1142260458e1d879&language=en-US&page=1";

var RPi = "http://192.168.48.241/tvshows";

$(document).ready(function() {
    $.getJSON(RPiAPI, function(data) {
        
        var jsonSliced = data.results.slice(0, 20);
        console.log(jsonSliced);
       
        console.log(original_name);
        var tr;
        for (var i = 0; i < jsonSliced.length; i++) {
            
            //variabler för json data
            var name = jsonSliced[i].name;
            var origin_country = jsonSliced[i].origin_country;
            var original_language = jsonSliced[i].original_language;
            var original_name = jsonSliced[i].original_name;
            var overview = jsonSliced[i].overview;
            
            
            tr = $('<tr/>');
            tr.append("<td class='id centertxt'>" + jsonSliced[i].name + "</td>");
            tr.append("<td class='id centertxt'>" + jsonSliced[i].origin_country+ "</td>");
            tr.append("<td class='id centertxt'>" + jsonSliced[i].original_language + "</td>");
            tr.append("<td class='id centertxt'>" + jsonSliced[i].original_name + "</td>");
            tr.append("<td class='id centertxt'>" + jsonSliced[i].overview + "</td>");
            
            tr.append("<td> <form method='post' action='" + RPi + "'>" +
                      "<input type='hidden' name='title' value='" + name + "'</input>" +
                      "<input type='hidden' name='info' value='" + origin_country + "'</input>" +
                      "<input type='hidden' name='year' value='" + original_language + "'</input>" +
                      "<input type='hidden' name='posterurl' value='" + original_name + "'</input>" +
                      "<input type='hidden' name='title' value='" + overview + "'</input>" +
                      "<button type='submit' class='btn btn-outline-success'>" + "<i class='fas fa-plus'></i>" + "</button>" +
                      "</form> </td>");
            tr.append("<button type='button' class='del btn btn-outline-danger my-2 my-sm-0'><td>" + "Delete" + "</td></button>");
            tr.append("<button type='button' data-toggle='modal' data-target='#myModal' class='btn btn-outline-warning my-2 my-sm-0'><td>" +   "Update" + "</td></button>");
            $('table').append(tr);

        };
    });
});
