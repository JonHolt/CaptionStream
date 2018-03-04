var express = require("express");
var bodyParser = require("body-parser");
var app     = express();
var path    = require("path");

const BACKTRACK_LIMIT = 10;
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
});
app.get('/scripts/stream.js', function(req,res) {
    res.sendFile(__dirname + '/scripts/stream.js');
});
app.get('/scripts/polyfill.js', function(req, res) {
    res.sendFile(__dirname + '/scripts/polyfill.js');
});

// API
app.get('/api/currentLine', function(req, res) {
    res.send({
        currentLine: index - 1
    });
});
app.get('/api/linePoll/:latest', function(req,res) {
    if (!req.params.latest || req.params.latest >= index) {
        res.sendStatus(400);
        return;
    }
    
    let latest = (index - req.params.latest < BACKTRACK_LIMIT ? 
        Number(req.params.latest) + 1 : index - BACKTRACK_LIMIT);
    let result = {};
    for (var i = latest; i < index; i++) {
        result[i] = numberedChunks[i];
    }
    res.send(result);
});
app.post('/api/sendChunk', function(req, res) {
    // TODO: require password to be sent with each chuck
    if (!req.body) {
        res.sendStatus(400);
        return;
    }
    if (req.body.chunk) {
        numberedChunks[index++] = req.body.chunk;
    }
    if (req.body.newline) {
        numberedChunks[index++] = { newline: true }
    }
    res.sendStatus(200);
});
app.delete('/api/clearAll', function(req, res) {
    numberedChunks = {};
    index = 1;
    res.sendStatus(200);
});

app.listen(3000);
console.log('Running at port 3000');
