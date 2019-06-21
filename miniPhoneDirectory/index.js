var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var handlebars = require('handlebars');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
var multer = require('multer');
var upload = multer();
let ejs = require('ejs');
app.set("view engine", "ejs"); 
app.set('views',path.join(__dirname, 'views')); 
 
var url = 'mongodb://powerfist01:mypassword123@ds253840.mlab.com:53840/phone';
mongoose.Promise = global.Promise;
 
mongoose.connect(url, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error',function(err){
	console.log(err);
});

db.once('open',function(){
	console.log('Connected to database!')
})
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 8000);

var userSchema = mongoose.Schema; 

const user = new userSchema({
	name: String,
	phone: String,
	address: String
}); 

var userModel = mongoose.model('User', user);

app.get('/',function(req,res,next){
	res.render('index'); 
})

app.get('/contacts',function(req,res,next){
	userModel.find(function(err,res1){

		res.render('contacts',{items:res1});

	})
})

app.post('/insert',function(req,res,next){
	var myUser = new userModel(req.body);
	myUser.save('myUser',function(err){
		if(err)
			console.log('Oops...Error in Saving!');
		console.log('Details saved to the database.');
	})
	res.redirect('/');
})

app.listen(app.get('port'),function(err){
	if(err)
		console.log(err);
	console.log('Running on http://localhost:8000');
})