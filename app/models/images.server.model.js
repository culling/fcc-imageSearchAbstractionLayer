//https://www.terlici.com/2014/08/25/best-practices-express-structure.html

//var mongo = require(mongo);

var config  = require("./../../config/config.js");



var mongoPort       = config.mongoPort;
var mongoDatabase   = config.mongoDatabase;
var mongoCollectionName = config.mongoCollectionName;


//function addDocument(document){
//    mongo.connect(mongoUrl, function(err, db){
//        if(err){console.error(err)};
var collection = db.collection(mongoCollectionName);
collection.insertOne(document, function(err){
    if(err){console.error(err)}
    collection.findOne(document,
    {},
    function(err, document){
        if(err){console.error(err)};
        //console.log(JSON.stringify(document));
        db.close();            
    })
});
//    })
//}
