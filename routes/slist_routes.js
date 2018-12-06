var express = require("express");

var router = express.Router();
var slist = require("../models/slist.js");

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/all_slist", function(req,res){
    slist.all(function(sposts){
        res.render("index",{s_posts: sposts});
    });
});

module.exports = router;
