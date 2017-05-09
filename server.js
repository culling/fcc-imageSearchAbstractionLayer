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
app.post("/new", function(req, res){
    var body = req.body;

    var newDoc = {
        "url":      body.url,
        "alt-text": body["alt-text"],
        "original-page": body["original-page"],
        "submitted": new Date()
    }


    mongoExport.insertDoc(newDoc, function(err, returnedDocument){
        if(err){console.error(err)}
        console.log(returnedDocument);
    });


    res.end("submitted");

});


//var db = mongoExport();
//console.log( db );
//require("./app/models/images.server.model");



//static files
app.use(express.static('./public'));


app.listen(config.port, function(){
    console.log("listening on port: " + config.port );
});