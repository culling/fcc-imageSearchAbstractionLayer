const url           = require("url");
const querystring   = require('querystring');

//Express and set up router
var express         = require('express');
var router          = express.Router();


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

//Allowing for the query to be modified as a get request
router.get("/images/search/new", function(req, res){
    //console.log(req.body["search-text"] );
    //var searchText = req.body["search-text"];
    /*
    var queryParts = req.url.split("?");
    var query = queryParts[queryParts.length -1 ];
    var searchText = query.split("search-text=")[query.split("search-text=").length -1];
    */
    var reqQuery    = querystring.parse(url.parse(req.url).query);
    var searchText  = reqQuery["search-text"];
    var offset      = reqQuery["offset"] || 0;
    console.log("offset: " + offset);
    
    var newDoc = {
        "search-text": searchText,
        "submitted": new Date()
    }
    mongoExport.search.create(newDoc, function(err, returnedDocument){
        if(err){console.error(err)}
        console.log(returnedDocument);
    });

    mongoExport.image.retrieve( searchText , offset, function(foundDocs ){
        foundDocs.forEach(function(foundDoc){
            //console.log(foundDoc);
            res.write(JSON.stringify(foundDoc) + "\n");
        });
        //res.write( JSON.stringify(req.body));
        res.end();
    }); 
    
});

router.get("/images/search", function(req, res){
    var reqQuery    = querystring.parse(url.parse(req.url).query);
    //var searchText  = reqQuery["search-text"];
    var offset      = reqQuery["offset"] || 0;
    //console.log("offset: " + offset);


    
    mongoExport.search.retrieve( offset, function(foundDocs ){
        foundDocs.forEach(function(foundDoc){
            //console.log(foundDoc);
            res.write(JSON.stringify(foundDoc) + "\n");
        });
        //res.write( JSON.stringify(req.body));
        res.end();
    }); 
    
});

/*
router.post("/search/", function(req, res){
    //console.log(req.body["search-text"] );
    var reqQuery    = querystring.parse(url.parse(req.url).query);
    var searchText  = reqQuery["search-text"];
    var offset      = reqQuery["offset"];
    console.log("offset: " + offset);

    
    mongoExport.search.retrieve( searchText , 0, function(foundDocs ){
        foundDocs.forEach(function(foundDoc){
            //console.log(foundDoc);
            res.write(JSON.stringify(foundDoc) + "\n");
        });
        //res.write( JSON.stringify(req.body));
        res.end();
    }); 
});
*/

module.exports = router;