var express = require('express');
var path = require('path');
var app = express();

var port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res, next) { 
    res.render('index'); 
})

app.get('/fetch',function(req,res){
    res.render('fetch')
})
app.listen(port, function (err) {
    if (err)
        throw err;
    console.log('Server Running on at http://localhost:%s', port);
}) 