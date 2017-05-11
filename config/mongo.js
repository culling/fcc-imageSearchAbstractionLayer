var config  = require("./config");

// mongo
var mongo   =   require("mongodb").MongoClient;
var mongoPort       = config.mongoPort;
var mongoDatabase   = config.mongoDatabase;
var mongoCollectionName = config.mongoCollectionName;
var mongoMaxReturnedDocs = config.mongoMaxReturnedDocs
console.log(mongoCollectionName);
var mongoUrl =  `mongodb://localhost:${mongoPort}/${mongoDatabase}`;



exports.insertDoc = function(document, res){
    var db = mongo.connect(mongoUrl);
    mongo.connect(mongoUrl, function(err, db){
        if(err){console.error(err)};
        var collection = db.collection(mongoCollectionName);
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
    //var query = { "alt-text" : new RegExp("/.*" + searchText + ".*/") };
    var query = { "alt-text" : {$regex:  '.*'+searchText+".*" } };
    var db = mongo.connect(mongoUrl);
    mongo.connect(mongoUrl, function(err, db){
        if(err){console.error(err)};
        var collection = db.collection(mongoCollectionName);

        collection.find(query).toArray(function (err, results){
        //collection.find({}).toArray(function (err, results){
            if (results.length > 0){
                //console.log(results );
                res(results);
            }
            db.close();
        });


    });
}