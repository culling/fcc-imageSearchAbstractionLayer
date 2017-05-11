var express = require('express');
var router = express.Router();
var config  = require("./../../config/config");


var mongoExport = require("./../../config/mongo");


router.get("/", function(req, res){
    res.write("API Query");
    res.end();
});

router.post("/images/new", function(req, res){
    var body = req.body;
    var newDoc = {
        "url":      body.url,
        "alt-text": body["alt-text"],
        "original-page": body["original-page"],
        "submitted": new Date()
    }
    mongoExport.image.create(newDoc, function(err, returnedDocument){
        if(err){console.error(err)}
        console.log(returnedDocument);
    });
    res.end("submitted");
});


router.post("/images/search", function(req, res){
    //console.log(req.body["search-text"] );
    var searchText = req.body["search-text"];
    mongoExport.image.retrieve( searchText , 0, function(foundDocs ){
        foundDocs.forEach(function(foundDoc){
            //console.log(foundDoc);
            res.write(JSON.stringify(foundDoc) + "\n");
        });
        //res.write( JSON.stringify(req.body));
        res.end();
    });
    
});

module.exports = router;