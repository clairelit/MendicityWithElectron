const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
//var getVersion = require('../my_modules/version.js');

//console.log( getVersion() );

//require the function that is exported from my connection module
//var connection = require('../my_modules/connection');

const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const url = process.env.CUSTOMCONNSTR_MongoDB || 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('startscreen');
});

router.get('/searchpage', function(req, res, next) {
    var db = req.db;
    var collection = db.get('mendoPeopleList');
    collection.find({},{},function(e,docs){
      res.render('searchpage', {"allPeople" : docs
      });
    });
});



router.post('/searchpage', function(req, res, next){
    var query = {};
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
    var db = req.db;
    var collection = db.get('mendoPeopleList');
    collection.find({$and: [query]} , function(e,docs){
      res.render('searchresults', {"allPeople" : docs
      });
    });
});

  //var county = (req.body.county);
  //var country = (req.body.country);
  //var myArray = db.mendoPeopleList.find({County:county , Country:country});
  //db stuff will go here
 //res.render('/searchpage');
  //, {peopleResults: myArray});//here send in results from the search of db
//});

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
