/* global mendoPeopleList */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var path = require('path');
//var db = require('diskdb');
//db = db.connect('public/mendoDatabase', ['mendoPeopleList']);

const Datastore = require ('nedb');
var mendoPeopleList = new Datastore({ filename:'public/mendoDatabase/mendoPeopleList.json', autoload: true});
//db = {};
//var db = new Datastore({ filename: __dirname + '/mendoPeopleList.json', autoload: true });

//const db = new Datastore({mendoPeopleList: 'public/mendoDatabase', corruptAlertThreshold: 1, autoload: true});
//db.loadDatabase(function (err){
  //console.log('datastore');  
//});

//db ={};
//db.mendoPeopleList = new Datastore('public/mendoDatabase/mendoPeopleList.json');
//db.mendoPeopleList.loadDatabase();

//var mongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectID;
//var url = process.env.CUSTOMCONNSTR_MongoDB || 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('startscreen');
});

//var myArray = db.mendoPeopleList.find({}, function (err, docs){
//});

router.get('/searchpage', function(req, res, next) {
      //var db = new Datastore({'mendoPeopleList':'public/mendoDatabase/mendoPeopleList.json'});
      mendoPeopleList.find({}, function (err, docs) {
       // console.log(docs);
        res.render('searchpage', {allPeople: docs});
    });
});


router.post('/searchpag', function(req, res, next){
    mendoPeopleList.find({county: { $exists: true}}, function (err, docs){
        console.log('county');
        res.render('searchresults');
    });
})
/*router.post('/searchpage', function(req, res, next){
    //var db = req.db;
    //var collection = db.get('mendoPeopleList');
    //db.mendoPeopleList.find({'county.'})
    //var query = {};
    if (req.body.county) {
    console.log(req.body.county);
    query.county = req.body.county;
    //collection.find({"county":" "});
}
    if (req.body.surname) {
        console.log(req.body.surname);
    query.surname = req.body.surname;
    //collection.find({"surname":" "});
}

    if (req.body.country) {
        console.log(req.body.country);
   query.country = req.body.country;
   //collection.find({"country":" "});
}
    if (req.body.town) {
        console.log(req.body.town);
    query.town = req.body.town;
    //collection.find({"town":" "});
}
    console.log(query);
    //var db = req.db;
    //var collection = db.get('mendoPeopleList');
    mendoPeopleList.find({$and: [query]} , function(e,docs){
      res.render('searchresults', {"allPeople" : docs
      });
    });
});*/

/*router.post('/searchpage', function(req, res, next){
  var county = (req.body.county);
  var country = (req.body.country);
  var myArray = mendoPeopleList.find({County:county , Country:country});
  //db stuff will go here
 res.render('/searchresults.jade');
({peopleResults: myArray});//here send in results from the search of db
});*/

/*router.post ('/searchpage', function(req, res, next){
    mendoPeopleList.find({$or: [{county: 'county'}, {country: 'country'}, {surname: 'surname'}]}, function (err, docs){
        console.log('county');
        res.render('searchresults', {allPeople: docs});
    });
});*/

/*router.post('/searchpage', function(req, res, next){
    var queryData ={
        query:{
            county:{ $in: 'county'},
            country:{ $in: 'country'},
            surname:{ $in: 'surname'}, function(err, docs){
                console.log('queryData');
                res.render('searchresults'), {allPeople: docs});
            }
        },
        
    }
});*/

router.get('/whatismendicity', function(req, res, next) {
  res.render('whatismendicity');
});

router.get('/whatisthebookoftransmission', function(req, res, next) {
  res.render('whatisthebookoftransmission');
});


router.get('/contactmendicity', function(req, res, next) {
  res.render('contactmendicity');
});

router.get('/homepage', function(req, res, next) {
  res.render('homepage');
});

module.exports = router;
//module.exports = Datastore;
