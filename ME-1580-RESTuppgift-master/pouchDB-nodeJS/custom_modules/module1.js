var request = require("request");

module.exports = function() {
    // Configure GET request.
    var headers = {
        "Accept": "application/json",
        "Accept-Charset": "utf-8"
    }

    var options = {  
        url: "https://freegeoip.net/json/",
        method: "GET",
        headers: headers
    };

    // Start the request.
    request(options, function(err, res, body) {  
        var json = JSON.parse(body); // Parse body and make it JSON.
        console.log("\nCurrent IP: " + json.ip);
    }).on("error", function(err){
        console.log("Error: " + err); // If error, print error.
    });
};