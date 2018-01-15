// Här skapas alla moduler som har installerats via npm
var express = require('express');
var app = express();
var path = require('path');
var error = Error('error');
var bodyParser = require('body-parser');
var pouchDB = require('pouchdb');


var hej = require('./custom_modules/module1.js');
var Data = require('./custom_modules/module2.js');
//Här skapas en lokal databas variabel
var database = new pouchDB("tvshows");
//Här skickas krypterad data till couchDB databasen
var remoteCouch = new pouchDB("http://localhost:5984/tvshows");
hej();

Data();

// Allow CORS(Cross Origin Resource Sharing). Decides who gets to access your server and what they are able to do.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*, DELETE");
    next();
});



//Här synkas data som har skickats in till couchDB
sync();
function sync() {
    var opts = {live: true};
    database.replicate.to(remoteCouch, opts);
    database.replicate.from(remoteCouch, opts);
} 
//Här används en json-tolkare
app.use(bodyParser.json());
//Man skapar en urlencoded tolkare
app.use(bodyParser.urlencoded({
    extended: true
}));

//Kör alla databas variabler och inkludera alla dokument som ska vara = sant
app.get("/tvshows", function (req, res) {
    database.allDocs({
        include_docs: true
    }).then(function (result) {
        res.send(result.rows.map(function (item) {
            return item.doc;
        }));
    }, function (error) {
        res.status(400).send(error);
    });
});
//Här postas ny data till routen tvshows och svarar med resultatet från databasen
app.post("/tvshows", function (req, res) {
    database.post(req.body).then(function (result) {
        res.redirect("back");
    });
});
//Här tas data bort från tvshows och returnerar resultaten från databasen 
app.delete("/tvshows/:id", function (req, res) {
    database.get(req.params.id).then(function (result) {
        return database.remove(result);
    }).then(function (result) {
        res.send(result);
    });
});

//Här uppdateras tvshows kolumnen och returnerar nya ändringar som har gjorts


/*app.put("/tvshows/:id", function (req, res) {
    database.get(req.body.id).then(function (result) {
    
        database.put(result);
        res.send(result);
    });
});
*/

app.listen(3000, function (error) {
    if (!error) {
        console.log('Server is running on port 3000');
    }
});
