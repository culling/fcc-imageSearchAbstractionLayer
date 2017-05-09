var config  = require("./config");

// mongo
var mongo   =   require("mongodb").MongoClient;
var mongoPort       = config.mongoPort;
var mongoDatabase   = config.mongoDatabase;
var mongoCollectionName = config.mongoCollectionName;
console.log(mongoCollectionName);
var mongoUrl =  `mongodb://localhost:${mongoPort}/${mongoDatabase}`;



exports.insertDoc = function(document, frm){
    var db = mongo.connect(mongoUrl);


    mongo.connect(mongoUrl, function(err, db){
    //        if(err){console.error(err)};
        var collection = db.collection(mongoCollectionName);
        collection.insertOne(document, function(err){
            if(err){console.error(err)}
            collection.findOne(document,
            {},
            function(err, document){
                if(err){console.error(err)};
                //console.log(JSON.stringify(document));
                frm = (JSON.stringify(document));
                
                db.close();
            })
        });
    });

    
    //console.log(response);

    //return db;
}