// require our dependencies
var express = require('express');
var app = express();
var port = 8080; 

// route our app
var router = require('./app/routes');
app.use('/', router);

// set static files (css and images) Location
app.use(express.static(__dirname + '/public'));

/*
var Trello = require("node-trello");
var t = new Trello("7877dd27f5b9b34fc38e734dadeeff61", "94260ec7eb53519bddd84cef66175f225d83fc2e8ac4d6ee616e28da519a67cd");
 
t.get("/1/members/me", function(err, data) {
  if (err) throw err;
  console.log(data);
});
 
// URL arguments are passed in as an object.
t.get("/1/members/me", { cards: "open" }, function(err, data) {
  if (err) throw err;
  console.log(data);
});
*/
// start the server
app.listen(port, function(){
    console.log('app started');
});

