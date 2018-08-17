var express = require('express');
var main = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";
var bodyParse = require('body-parser');

main.use(express.static(__dirname +'/client')); //serves the index.html
main.use(bodyParse.json());

main.get('/Record',function(req,res){
	//console.log("Data transferred.");
	MongoClient.connect(url, function(err,db) {
	    if (err) throw err;
	    var dbo = db.db("contact");
	    //Find all documents in the collection:
	    dbo.collection("record").find({}).toArray(function(err,result) {
	    	if(err) throw err;
	    	//console.log(result);
	    	res.json(result);
	    	//db.close();
	    });
	});
});

main.post('/AddRec',function(req,res){
	//console.log(req.body);
	MongoClient.connect(url, function(err,db) {
	    if(err) throw err;
	    var dbo = db.db("contact");
	    //Insert a new record in the collection:
	    dbo.collection("record").insertOne(req.body,function(err,Result){
	    	if(err) throw err;
	    	dbo.collection("record").find({}).toArray(function(err,result){
	    		if(err) throw err;
	    		res.json(result);
	    	});
	    });
	});
});

main.delete('/DelRec/:Id',function(req,res){
	var id=req.params.Id;
	//console.log(id);
	MongoClient.connect(url, function(err,db) {
	    if(err) throw err;
	    var dbo = db.db("contact");
	    var qry = { _id: ObjectId(id) };
	    //Delete a record in the collection:
	    dbo.collection("record").deleteOne(qry,function(err,Result){
	    	if(err) throw err;
	    	dbo.collection("record").find({}).toArray(function(err,result){
	    		if(err) throw err;
	    		res.json(result);
	    	});
	    });
	});
});

main.get('/EdRec/:id',function(req,res){
	var id = req.params.id;
	//console.log(id);
	MongoClient.connect(url, function(err,db) {
	    if(err) throw err;
	    var dbo = db.db("contact");
	    var qry = { _id: ObjectId(id) };
	    //Edit a record in the collection:
	    dbo.collection("record").findOne(qry,function(err,result){
	    	if(err) throw err;
	    	res.json(result);
	    });
	});
});

main.put('/UpdRec/:id',function(req,res){
	var id = req.params.id;
	//console.log(req.body.name+" + "+id);
	MongoClient.connect(url, function(err,db) {
	    if(err) throw err;
	    var dbo = db.db("contact");
	    var qry = { _id: ObjectId(id) };
	    var newval = { $set: {name:req.body.name, phno:req.body.phno, email:req.body.email} };
	    //Update a record in the collection:
	    dbo.collection("record").updateOne(qry,newval,function(err,Result){
	    	if(err) throw err;
	    	dbo.collection("record").find({}).toArray(function(err,result){
	    		if(err) throw err;
	    		res.json(result);
	    	});
	    });
	});
});

main.listen(8000); //listens on port 8000 -> http://localhost:8000/
console.log("..Listening from port 8000..");