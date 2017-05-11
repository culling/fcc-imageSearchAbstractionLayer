var express = require('express');
var router = express.Router();
var config  = require("./../../config/config");


var mongoExport = require("./../../config/mongo");


router.get("/", function(req, res){
    res.write("API Query");
    res.end();
});

router.get("/images/:id", function(req, res){
    res.write( req.params.id )
    res.end();
});

router.post("/images/search", function(req, res){
    var mongoCollectionName = config.mongoCollectionName;
    //console.log(req.body["search-text"] );
    var searchText = req.body["search-text"];
    mongoExport.image.retrieve( searchText , 0, mongoCollectionName, function(foundDocs ){
        foundDocs.forEach(function(foundDoc){
            //console.log(foundDoc);
            res.write(JSON.stringify(foundDoc) + "\n");
        });
        //res.write( JSON.stringify(req.body));
        res.end();
    });
    
});

module.exports = router;