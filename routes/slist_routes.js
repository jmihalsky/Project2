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


module.exports = router;
