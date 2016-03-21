const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var mongoClient = require('mongodb').MongoClient;
var monk = require('monk');
var db = monk('mongodb://localhost:27017/mendoPeopleList');


// If I am running locally then use 'mongodb://localhost:27017/test' otherwise
// look for the environment variable
var url = process.env.CUSTOMCONNSTR_MongoDB || 'mongodb://localhost:27017/mendoPeopleList';


/* GET search page. */
router.get('/searchpage', function(req, res, next) {
    var db = req.db;
    var collection = db.get('mendoPeopleList');
    collection.find({},{},function(e,docs){
      res.render('searchpage', {
        "resultsFromDB" : docs
    });
    });
  //res.render('searchpage');
});

/*router.get('/searchpage', function(req, res, next) {
    var collection = db.get('people');
    collection.find({}, function(err, mendoPeopleList){
        if (err) throw err;
      	res.json(mendoPeopleList);
    });
});*/

/*router.get('/searchpage', function(req, res, next){
  var db =req.db;
  var collection =db.get('mendoPeopleList');
  res.render('searchpage', {mendoPeopleList: docs});

});*/

/*router.get('/searchpage', function(req, res, next) {
    var collection = db.get('mendoPeopleList');
    collection.find({}, function(err, mendoPeopleList){
        if (err) throw err;
      	res.json(mendoPeopleList);
    });
});*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('startscreen');
});

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
