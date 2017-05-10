var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
    res.write("API Query");
    res.end();
});

router.get("/:id", function(req, res){
    res.write( req.params.id )
    res.end();
});

module.exports = router;