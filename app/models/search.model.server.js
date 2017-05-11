var config  = require("./../../config/config");

// mongo
var mongo               =   require("mongodb").MongoClient;
var mongoPort           = config.mongoPort;
var mongoDatabase       = config.mongoDatabase;
var collectionName      = "search";
var mongoMaxReturnedDocs = 10;
//console.log(collectionName);
var mongoUrl =  `mongodb://localhost:${mongoPort}/${mongoDatabase}`;



exports.create = function(document, res ){
  //console.log(collectionName);
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

exports.retrieve = function(searchText,offset, res){
    var query = {} ;
    var db = mongo.connect(mongoUrl);
    mongo.connect(mongoUrl, function(err, db){
        if(err){console.error(err)};
        var collection = db.collection(collectionName);

        collection.find(query).sort({"submitted": -1}).limit(5).toArray(function (err, results){
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