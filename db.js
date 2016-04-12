var fs = require('fs');
var sql = require('sql.js');
var bfr = fs.readFileSync('./tmp/db.sqlite');
var db = new sql.Database(bfr);
db.each('SELECT * FROM test', function (row) {
  console.log(row);
});
