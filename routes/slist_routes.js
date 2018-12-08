var express = require("express");
var router = express.Router();
var slist = require("../models/slist.js");
var passport = require('passport');
var path = require('path');

router.get("/", function (req, res) {
    slist.all(function (sposts) {
        var slistposts = {
            sposts: sposts
        };
        console.log(slistposts);
        res.render("index", slistposts);
    });
});

router.get("/post/:id", function (req, res) {
    slist.posts(req.params.id, function (sposts) {
        console.log(sposts);
        var slistposts = {
            sposts: sposts
        }
        res.render("post", slistposts);
    });
});


router.get("/city_search/:city", function (req, res) {
    slist.city(req.param.city, function (sposts) {
        var slistposts = {
            sposts: sposts
        };
        res.render("search", slistposts);
    });
});

// User Login Route
router.get("/", function(req,res,next){
    res.sendFile(path.join(__dirname, '../views/login.handlebars'));
 });
 
 router.post('/',
    passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/'
    })
 );

//  Register New User Route
router.get('/', function(req, res, next){
    res.sendFile(path.resolve(__dirname, '../views/register.html'));
 });
 
 router.post('/', function(req,res,next) {
   pg.connect(connectionString, function(err, client){
 
     var query = client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [request.body.username, request.body.password]);
 
     query.on('error', function(err){
       console.log(err);
     })
 
     query.on('end', function(){
       response.sendStatus(200);
       client.end();
     })
 
   })
 });

//  User authenticated
router.get('/', function(req, res, next) {
    res.send(req.isAuthenticated());
 });


module.exports = router;