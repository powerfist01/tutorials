var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.get('/', function (req, res, next) {
    res.send('HelloWorld');
})

app.listen(port, function (err) {
    if (err)
        throw err;
    console.log('Server Running on at http://localhost:%s', port);
})