var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
var multer = require('multer');
var upload = multer();
let ejs = require('ejs');
var mail = require('nodemailer');
app.set("view engine", "ejs"); 
app.set('views',path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public')));
var config = require('./config/config.js');
 
var url = config.dbURL;
mongoose.Promise = global.Promise;

mongoose.connect(url, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error',function(err){
	console.log(err);
});
 
db.once('open',function(){
	console.log('Connected to database!')
})

var userSchema = mongoose.Schema; 

const user = new userSchema({
	name: String,
	email: String,
    address: String,
    phone: String
}); 

var userModel = mongoose.model('User', user);

app.get('/',function(req,res,next){
    res.render('index');
})

app.post('/insert',function(req,res,next){
    const min = 1111111111;
    const max = 9999999999;
    var temp = Math.floor(Math.random()*(max-min+1) + min);
    var myUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: temp
    });
    myUser.save('myUser',function(err){
        if(err)
            console.log('Oops...Error in Saving!');
        else
            console.log('Details saved to the database.');
    })
    res.render('message',{ value : temp });
})

app.get('/fancy',function(req,res,next){
    res.render('fancy', {message: ''});
})

app.post('/addFancy',function(req,res,next){ 
    var temp = req.body.phone;
    userModel.findOne({ phone: req.body.phone },function(err,doc){
        if(err)
            console.log(err);
        if(doc!=null)
        {
            console.log("found");
            res.render('fancy',{message : 'Already Taken'});
        }else{
            var myUser = new userModel(req.body);
            myUser.save('myUser',function(err){
                if(err)
                    console.log('Oops...Error in Saving!');
                else
                    console.log('Details saved to the database.');
            })
            res.render('message',{ value : temp });
        }
        
    }) 
}) 

app.set('port',process.env.PORT || 8000);
app.listen(app.get('port'),function(err){
	if(err)
		console.log(err);
	console.log('Running on http://localhost:8000');
})