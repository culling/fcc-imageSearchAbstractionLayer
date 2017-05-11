var express = require('express');
var router = express.Router();


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
    mongoExport.retrieve(/*req.body.searchText*/"test", 0, function(foundDocs ){
        foundDocs.forEach(function(foundDoc){
            //console.log(foundDoc);
            res.write(JSON.stringify(foundDoc) + "\n");
        });
        //res.write( JSON.stringify(req.body));
        res.end();
    });
    
});

module.exports = router;