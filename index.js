var express = require("express");
var app     = express();
var path    = require("path");

// Views
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/cc.html');
});
app.get('/dictation', function(req,res) {
    res.sendFile(__dirname + '/views/dictation.html');
});

// Resources
app.get('/content/style.css', function(req, res) {
    res.sendFile(__dirname + '/content/style.css');
});
app.get('/scripts/dictate.js', function(req, res) {
    res.sendFile(__dirname + '/scripts/dictate.js');
})

app.listen(3000);
console.log('Running at port 3000');
