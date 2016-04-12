// require mongodb, which returns an object which has a property
// called MongoClient which is what we want.
// If running locally make sure your server is running. I usually have
// to something like:
var mongoClient = require('mongodb').MongoClient;

// If I am running locally then use 'mongodb://localhost:27017/test' otherwise
// look for the environment variable
var url = process.env.CUSTOMCONNSTR_MongoDB || 'mongodb://localhost:27017/test'; 

/**
 * db is a local variable that is visible in only this file (like all local variables).
 * The variable is initially set to null and then when this function is first called
 * the a database connection is made and stored in this db variable. All subsequent 
 * calls to this function will check to see if the variable is null (which it now shouldn't be)
 * and if not return it. If it is null it will connect again to the database. This 
 * approach ensures that only one connect is ever made to the database.
 */
var db          = null;

// Export a function that has a callback (cb) function as a parameter. The cb
// should in turn have two arguments, the first is an error object and the
// second is a mongoDB connection object i.e. the cb function should have
// a signature like cb(err, dbConn)
module.exports = function (cb){
  
  if(db != null){
    // okay we have the db connection object so let's just call the 
    // callback function and pass it the connection object (and null for
    // error)
    console.log("Returning existing connection");
    cb(null, db);
    
    // return so that this function stops executing (remember, nothing
    // after the return statement gets executed).
    return;
  }

  // The following will only execute if we have not already created a db
  // connection object
  // Use the mongoClient object we required from the mongodb paccakage to
  // connect to the mongodb
  mongoClient.connect(url, function(err, conn) {
    if(err){
      console.log(err.message);
      cb(err, null);
    } else {
      console.log("New connection established");
      db = conn; 
      
      // If someone closes the connection make sure to set db to null so that
      // we will reconnect the next time this is called.
      db.on('close', function(){
        db = null;    
      });
      
      cb(null, db);
    }
 
  });
  
}