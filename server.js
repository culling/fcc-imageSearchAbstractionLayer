/*
Free Code Camp: Image Search Abstraction Layer
https://www.freecodecamp.com/challenges/image-search-abstraction-layer

User Story: I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

User Story: I can paginate through the responses by adding a ?offset=2 parameter to the URL.

User Story: I can get a list of the most recently submitted search strings.
*/

//express
var express = require("express");
var app     = express();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config  = require("./config/config.js");


var mongoExport = require("./config/mongo");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));


var api = require("./app/routes/api");
app.use("/api", api);

//static files
app.use(express.static('./public'));


app.listen(config.port, function(){
    console.log("listening on port: " + config.port );
});