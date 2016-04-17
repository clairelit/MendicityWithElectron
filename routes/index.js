/* global mendoPeopleList */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var path = require('path');

//var window = window.$ = window.jQuery = require('./javascripts/jquery-1.12.1.min.js');

const Datastore = require ('nedb');
var mendoPeopleList = new Datastore({ filename:'public/mendoDatabase/mendoPeopleList.json', autoload: true});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('startscreen');
});


router.get('/searchpage', function(req, res, next) {
      mendoPeopleList.find({}, function (err, docs) {
       // console.log(docs);
        res.render('searchpage', {allPeople: docs});
    });
});


router.post('/searchpage', function(req, res, next){
    var county = (req.body.county);
    console.log(req.body.county);
    var country = (req.body.country);
    var surname =(req.body.surname);
     mendoPeopleList.find({county: { $exists: true}}, function (err, docs){
        console.log(county);
        console.log(country);
        console.log(surname);
      res.render('searchresults', {peopleResults: docs});
    });  
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
//module.exports = Datastore;
