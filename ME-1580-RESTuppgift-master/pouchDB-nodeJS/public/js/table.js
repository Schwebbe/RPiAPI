$(document).ready(function () {

    var APIUrl = "https://api.themoviedb.org/3/tv/top_rated?api_key=18034db0bd94fb6a1142260458e1d879&language=en-US&page=1";
    var dbUrl = "http://192.168.48.241:3000/tvshows";
    var APIDataExists = false;
    var DBDataExists = false;
    //Getting json data from API, this one shows the top rated tv series
    $.getJSON(APIUrl, function (data) {
        //Slicing list of objects and showing 20 results
        var jsonSliced = data.results.slice(0, 20);

        var tr;
        for (var i = 0; i < jsonSliced.length; i++) {

            //variabler för json data
            var name = jsonSliced[i].name;
            var origin_country = jsonSliced[i].origin_country;
            var original_language = jsonSliced[i].original_language;
            var overview = jsonSliced[i].overview;
            var poster_path = jsonSliced[i].poster_path;

            tr = $('<tr/>');
            tr.append("<td class='id centertxt'><img src='http://image.tmdb.org/t/p/w185//" + poster_path + "'></td>");
            tr.append("<td class='id centertxt'>" + name + "</td>");
            tr.append("<td class='id centertxt'>" + origin_country + "</td>");
            tr.append("<td class='id centertxt'>" + original_language + "</td>");
            tr.append("<td class='id centertxt'>" + overview + "</td>");

            tr.append("<td> <form method='post' action='" + dbUrl + "'>" +
                "<input type='hidden' name='title' value='" + name + "'</input>" +
                "<input type='hidden' name='country' value='" + origin_country + "'</input>" +
                "<input type='hidden' name='language' value='" + original_language + "'</input>" +
                "<input type='hidden' name='poster_path' value='" + poster_path + "'</input>" +
                "<input type='hidden' name='description' value='" + overview + "'</input>" +
                "<button type='submit' class='btn btn-outline-success'>" + "<i class='fas fa-plus'>Add</i>" + "</button>" +
                "</form> </td>");

            $(".table").append(tr);

        };
    });
    //Getting json data from local DB
    $.getJSON(dbUrl, function (data) {
        var tr;
        for (var i = 0; i < data.length; i++) {

            //variabler för json data
            var id = data[i]._id;
            var title = data[i].title;
            var country = data[i].country;
            var language = data[i].language;
            var poster_path = data[i].poster_path;
            var description = data[i].description;

            tr = $('<tr/>');
       /*     tr.append('<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">' + "Button with data-target" + '</button>');
            tr.append("<div class='collapse' id='collapseExample'> " + 
                      + " <div class='card card-body'>" + " Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident." + "</div>" + 
                      "</div>"
                     ); */
            tr.append("<td style='display: none;' class='id centertxt'>" + id + "</td>");
            tr.append("<td class='centertxt'><img class='card-img-top' src='http://image.tmdb.org/t/p/w185//" + poster_path + "'></td>");
            tr.append("<td class='centertxt'>" + title + "</td>");
            tr.append("<td class='centertxt'>" + country + "</td>");
            tr.append("<td class='centertxt'>" + language + "</td>");
            tr.append("<td class='centertxt'>" + description + "</td>");
            tr.append("<button type='button' class='del btn btn-outline-danger my-2 my-sm-0'><td>" + "Delete" + "</td></button>");
            //looping appending data in a certain class
            $(".dataCollapse").append(tr);
            //Delete knapp för varje kolumn
            $('.del').click(function () {
                // Pull out ID.
                var row = $(this).closest("tr"); // Find the row.
                var text = row.find(".id").text(); // Find the row's content (ID).
                //Ajax delete funktion, HTML har bara post och get
                $.ajax({
                    type: 'DELETE',
                    url: 'http://192.168.48.241:3000/tvshows/' + text
                });
                window.location.reload();
            });
        };

    });

    function ApiTableCheck() {
        //Checks if table rows is more than 1.
        if ($(".table tr").length > 1) {
            //If rows is more than 1, make boolean true.
            APIDataExists = true;
        };
        //Configures a promise.
        var tablePromise = new Promise(function (resolve, reject) {
            //If boolean is true, resolve with string.
            if (APIDataExists) {
                var exists = "API-data exists.";
                resolve(exists); // fulfilled
            } else {
                //If boolean is false, reject with string.
                var reason = "API-data failed to load. try again later.";
                reject(reason); // reject
            }

        });
        //Execute promise. 
        tablePromise.then(function(fromResolve) {
            console.log(fromResolve);
        }).catch(function(fromReject) {
            alert(fromReject);
        }); 

    };


    function DataBaseTableCheck() {
        //Checks if table rows is more than 1.
        if ($(".table tr").length > 1) {
            //If rows is more than 1, make boolean true.
            DBDataExists = true;
        };
        //Configures a promise.
        var tablePromise = new Promise(function (resolve, reject) {
            //If boolean is true, resolve with string.
            if (DBDataExists) {
                var exists = "Database-data exists.";
                resolve(exists); // fulfilled
            } else {
                //If boolean is false, reject with string.
                var reason = "Database-data failed to load. try again later.";
                reject(reason); // reject
            }

        });
        //Execute promise. 
        tablePromise.then(function(fromResolve) {
            console.log(fromResolve);
        }).catch(function(fromReject) {
            alert(fromReject);
        }); 

    };
    //Call after 2 seconds to let tables find data.
    setTimeout(ApiTableCheck, 2000);
    setTimeout(DataBaseTableCheck, 2000);
});
