var express = require("express");
var router = express.Router();
var slist = require("../models/slist.js");
var db = require("../smodels");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var path = require("path");

//AWS
var AWS = require('aws-sdk');

var s3 = new AWS.S3({
  accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});


//homepage
router.get("/", function (req, res) {
  res.render("index");
});

//view all search
router.get("/all", function (req, res) {
  slist.all(function (sposts) {
    var slistposts = {
      sposts: sposts
    };
    res.render("search", slistposts);
  });
});

//post pages
router.get("/post/:id", function (req, res) {
  slist.posts(req.params.id, function (sposts) {
    console.log(sposts);
    slist.comments(req.params.id, function (scoms) {
      console.log(scoms);
      res.render("post", { sposts: sposts, scoms: scoms });
    });
  });
});

// comment - delete route
router.delete("/api/comments/:id", function (req, res) {
  if (!req.user) {
    res.redirect("/login");
  }
  else {
    var condition = req.params.id;

    slist.dlt_comments(condition, function (result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  }
});


//Uploading new comment images
router.post("/uploadcomment", function (req, res) {
  if (Object.keys(req.files).length == 0) {
    res.status(400).send("No files were uploaded.");
    return;
  } else {
    var file = req.files.commentPhoto;
    uploadFile(file);
    //getSignedRequest(file);
  }
});




function uploadFile(file) {

  var params = {
    Key: file.name,
    Bucket: process.env.BUCKETEER_BUCKET_NAME,
    Body: file.data,
  };

  s3.putObject(params, function put(err, data) {
    if (err) {
      console.log(err, err.stack);
      return;
    } else {
      console.log(data);
    }
    delete params.Body;

  });

};




// comment - post route
router.post("/api/comments/:id", function (req, res) {
  if (!req.user) {
    res.redirect("/login");
  }
  else {
    slist.createComment(
      ["PostID", "UserID", "CommentText", "CommentRating", "comment_image"],
      [req.body.PostID, req.user.UserID, `"` + req.body.CommentText + `"`, req.body.CommentRating, `"` + req.body.comment_image + `"`], function (result) {
        console.log(result);
        slist.posts(req.params.id, function (sposts) {
          console.log(sposts);
          slist.comments(req.params.id, function (scoms) {
            console.log(scoms);
            res.render("post", { sposts: sposts, scoms: scoms });
          });
        });
      });
  }
});

//login page
router.get("/login", function (req, res) {
  res.render("login");
});

//signup page
router.get("/signup", function (req, res) {
  res.render("signup");
});

//search page
router.get("/city_search/:city", function (req, res) {
  slist.city(req.params.city, function (sposts) {
    var slistposts = {
      sposts: sposts
    };
    res.render("search", slistposts);
  });
});

router.get("/zip_search/:zip", function (req, res) {
  slist.zip(req.params.zip, function (sposts) {
    var slistposts = {
      sposts: sposts
    };
    res.render("search", slistposts);
  });
});

//Uploading "new post images!"
router.post("/upload", function (req, res) {

  if (Object.keys(req.files).length == 0) {
    res.status(400).send("No files were uploaded.");
    return;
  } else {
    var file = req.files.commentPhoto;
    uploadFile(file);
    //getSignedRequest(file);
  }
});

//Sending new Location to MySQL
router.post("/newlocation", function (req, res) {
  if (!req.user) {
    res.redirect("/login");
  }
  else {
    slist.createLocation(
      [
        "UserID",
        "LocationName",
        "LocAddr",
        "City",
        "State",
        "Zip",
        "PostText",
        "PostRating",
        "post_image"
      ],
      [
        req.user.UserID,
        `"` + req.body.LocationName + `"`,
        `"` + req.body.LocAddr + `"`,
        `"` + req.body.City + `"`,
        `"` + req.body.State + `"`,
        req.body.Zip,
        `"` + req.body.PostText + `"`,
        req.body.PostRating,
        `"` + req.body.post_image + `"`
      ],
      function (sposts) {
        var slistposts = {
          sposts: sposts
        };
        res.render("index", slistposts);
      }
    );
  }
});

router.post("/api/signup", function (req, res) {
  console.log(req.body);
  db.Usr.create({
    username: req.body.username,
    pword: req.body.pword,
    email: req.body.email
  }).then(function () {
    res.redirect(307, "/api/login");
  }).catch(function (err) {
    res.json(err);
  });
});

router.post("/api/login", passport.authenticate("local"), function (req, res) {
  console.log(req.user);
  res.json("/");
});

module.exports = router;
