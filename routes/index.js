/* global mendoPeopleList */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

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
        console.log(docs);
        res.render('searchpage', {allPeople: docs});
    });
});



/*router.post('/searchpage', function(req, res, next){
  var county = (req.body.county);
  var country = (req.body.country);
  var myArray = db.mendoPeopleList.find({County:county , Country:country});
  //db stuff will go here
 res.render('/searchpage');
({peopleResults: myArray});//here send in results from the search of db
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
