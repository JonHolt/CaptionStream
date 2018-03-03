var express = require("express");
var bodyParser = require("body-parser");
var app     = express();
var path    = require("path");
var index = 1;
var numberedChunks = {}

// Middleware
app.use(bodyParser.json());

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

// API
app.post('/api/sendChunk', function(req, res) {
    // TODO: require password to be sent with each chuck
    if (!req.body) {
        res.sendStatus(400);
    }
    if (req.body.chunk) {
        numberedChunks[index++] = req.body.chunk;
    }
    if (req.body.newline) {
        numberedChunks[index++] = { newline: true }
    }
    console.log(numberedChunks);
    res.sendStatus(200);
});
app.delete('/api/clearAll', function(req, res) {
    numberedChunks = {};
    index = 1;
    res.sendStatus(200);
});

app.listen(3000);
console.log('Running at port 3000');
