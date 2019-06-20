var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

var fileUrl = new URL('file:/home/powerfist01/smallProjects/mcuDialogues/files/text.txts');
console.log(URL.pathName);

app.get('/',function(req,res,next){
    res.send('Hello World');
})

var port = process.env.PORT || 4040;
app.listen(port,function(err){
    if(err)
        throw err;
    console.log('Server Up and Running at http://localhost:%s',port);
})