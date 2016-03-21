/*var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/mendoPeopleList');

router.get('/searchpage', function(req, res) {
    var collection = db.get('people');
    collection.find({}, function(err, mendoPeopleList){
        if (err) throw err;
      	res.json(people);
    });
});

module.exports = router;*/
