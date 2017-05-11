var config  = require("./../../config/config");
//var mongoExport = require("./../../config/mongo");


// mongo
var mongo   =   require("mongodb").MongoClient;
var mongoPort       = config.mongoPort;
var mongoDatabase   = config.mongoDatabase;
//var mongoCollectionName = config.mongoCollectionName;
//var mongoMaxReturnedDocs = config.mongoMaxReturnedDocs
//console.log(collectionName);
var mongoUrl =  `mongodb://localhost:${mongoPort}/${mongoDatabase}`;


/*
exports.create = function(document, collectionName, res ){
  console.log(collectionName);
    var db = mongo.connect(mongoUrl);
    mongo.connect(mongoUrl, function(err, db){
        if(err){console.error(err)};
        var collection = db.collection( collectionName );
        collection.insertOne(document, function(err){
            if(err){console.error(err)}
            collection.findOne(document,
            {},
            function(err, document){
                if(err){console.error(err)};
                res(null, document);
                db.close();
            });
        });
    });
}



exports.retrieve = function(searchText,offset, collectionName, res){
console.log(collectionName);
    console.log(searchText);
    var query = { "alt-text" : {$regex:  '.*'+searchText+".*" } };
    var db = mongo.connect(mongoUrl);
    mongo.connect(mongoUrl, function(err, db){
        if(err){console.error(err)};
        var collection = db.collection(collectionName);

        collection.find(query).toArray(function (err, results){
        //collection.find({}).toArray(function (err, results){
            if (results.length > 0){
                console.log(results );
                res(results);
            }else{
                res([{}]);
            }
            db.close();
        });
    });
}
*/