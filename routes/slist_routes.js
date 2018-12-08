var express = require("express");

var router = express.Router();
var slist = require("../models/slist.js");

router.get("/", function (req, res) {
    slist.all(function (sposts) {
        var slistposts = {
            sposts: sposts
        };
        console.log(slistposts);
        res.render("index", slistposts);
    });
});

router.get("/post/:id",function(req,res){
    slist.posts(req.params.id,function(sposts){
        var slistposts = {
            sposts: sposts
        };
        res.render("post",slistposts);
    });
});
    

router.get("/city_search/:city",function(req,res){
    slist.city(req.param.city,function(sposts){
        var slistposts = {
            sposts: sposts
        };
        res.render("search",slistposts);
    });
});

module.exports = router;