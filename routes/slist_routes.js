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

router.get("/all_slist", function (req, res) {
    slist.all(function (sposts) {
        res.render("index", { s_posts: sposts });
    });
});

router.get("/city_search/:city",function(req,res){
    slist.city(req.param.city,function(sposts){
        res.render("index",{s_posts: sposts});
    });
});

module.exports = router;
