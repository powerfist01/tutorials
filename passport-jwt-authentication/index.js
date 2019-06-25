const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err, user);
    });
});

const url = "mongodb://localhost:27017/myproject";
mongoose.connect(url, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
});

userSchema.methods.validPassword = function (pwd) {
    return (this.password === pwd);
};

var userModel = mongoose.model('user', userSchema);

var db = mongoose.connection;
db.once('open', function () {
    console.log('Database Connected');
})

function verifyToken(req,res,next){
    const bearedHeader = req.headers['authorization'];
    if(typeof bearedHeader !== 'undefined'){
        const bearer = bearedHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.post('/helloworld', verifyToken, function(req,res,next){
    jwt.verify(req.token, 'iamsexyandiknowit',function(err,data){
        if(err)
            throw err;
        else
        res.json({
            "message":"Yahan aana allowed nahi tha",
            "gist":"lekin aa gya"
        })
    })
})

app.post('/myworld', verifyToken, function(req,res,next){
    jwt.verify(req.token, 'iamsexyandiknowit',function(err,data){
        if(err)
            res.sendStatus(403);
        else
        res.json({
            "message":"Yahan bhi aana allowed nahi tha",
            "gist":"lekin aa gya"
        })
    })
})

app.get('/dash', function (req, res, next) {
    res.json({
        "message": "You are good to go",
        "author": "Alone"
    })
})

app.get('/', function (req, res, next) {
    res.json({
        "message": "Failed to login"
    });
})

app.post('/login', passport.authenticate('local',
    // {
    //     session: false
    // },
    {
        successRedirect: '/dash',
        failureRedirect: '/'
        //failureFlash: true
    })
);

passport.use(new LocalStrategy(function (username, password, done) {    
        userModel.findOne({ username: username }, function (err, user) {
            console.log(user);
            if (err) {
                throw err;
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            var payload = {
                username: user.username,
                password: user.password,
                email: user.email
            }
            const token = jwt.sign(payload, 'iamsexyandiknowit');
            console.log(token);
            return done(null, user);
        });
    }
));


app.listen(4444, function (req, res, next) {
    console.log('Server running  on port http://localhost:4444');
})