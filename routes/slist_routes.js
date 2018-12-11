var express = require("express");
var router = express.Router();
var slist = require("../models/slist.js");
var passport = require("passport");
var path = require("path");

//homepage
router.get("/", function(req, res) {
  slist.all(function(sposts) {
    var slistposts = {
      sposts: sposts
    };
    res.render("index", slistposts);
  });
});

//post pages
router.get("/post/:id", function(req, res) {
  slist.posts(req.params.id, function(sposts) {
    console.log(sposts);
    slist.comments(req.params.id, function(scoms) {
      console.log(scoms);
      res.render("post", { sposts: sposts, scoms: scoms });
    });
  });
});

// comment - delete route

router.delete("/api/comments/:id", function(req, res) {
  console.log("deleting comment " + req.params.id);
  slist.dlt_comments(req.params.id, function(result) {
    console.log(result);
    //refreshes page...
    slist.posts(req.params.id, function (sposts) {
      console.log(sposts);
      slist.comments(req.params.id, function (scoms) {
        console.log(scoms);
        res.render("post", { sposts: sposts, scoms: scoms });
      });
    });
  });
});


//Uploading new comment images
router.post("/uploadcomment", function (req, res) {
  var photo;
  var uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  photo = req.files.commentPhoto;

  uploadPath = __dirname + "/assets/img/comment_img/" + photo.name;

  photo.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      console.log("File uploaded to " + uploadPath);
    };
  });
});




// comment - post route


router.post("/api/comments/:id", function (req, res) {
  slist.createComment([
    "PostID", "UserID", "CommentText", "CommentRating", "comment_image"
  ], [
      req.body.PostID, req.body.UserID, `"` + req.body.CommentText + `"`, req.body.CommentRating, `"` + req.body.comment_image + `"`
    ], function (result) {
      console.log(result);
      slist.posts(req.params.id, function (sposts) {
        console.log(sposts);
        slist.comments(req.params.id, function (scoms) {
          console.log(scoms);
          res.render("post", { sposts: sposts, scoms: scoms });
        });
      });
    });

});



//login page
router.get("/login", function(req, res) {
  res.render("login");
});

//signup page
router.get("/signup", function(req, res) {
  res.render("signup");
});

//search page
router.get("/city_search/:city", function(req, res) {
  slist.city(req.params.city, function(sposts) {
    var slistposts = {
      sposts: sposts
    };
    res.render("search", slistposts);
  });
});

router.get("/zip_search/:zip", function(req, res) {
  slist.zip(req.params.zip, function(sposts) {
    var slistposts = {
      sposts: sposts
    };
    res.render("search", slistposts);
  });
});

//Uploading "new post images!"
router.post("/upload", function(req, res) {
  var photo;
  var uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  photo = req.files.locationPhoto;

  uploadPath = __dirname + "/assets/img/post_img/" + photo.name;

  photo.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      console.log("File uploaded to " + uploadPath);
    };
  });
});

//Sending new Location to MySQL
router.post("/newlocation", function(req, res) {
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
      req.body.UserID,
      `"` + req.body.LocationName + `"`,
      `"` + req.body.LocAddr + `"`,
      `"` + req.body.City + `"`,
      `"` + req.body.State + `"`,
      req.body.Zip,
      `"` + req.body.PostText + `"`,
      req.body.PostRating,
      `"` + req.body.post_image + `"`
    ],
    function(sposts) {
      var slistposts = {
        sposts: sposts
      };
      res.render("index", slistposts);
    }
  );
});

///look at stuff below!
// User Login Route
router.get("/", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/login.handlebars"));
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/users",
    failureRedirect: "/"
  })
);

//  Register New User Route
router.get("/", function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "../views/register.html"));
});

router.post("/", function(req, res, next) {
  pg.connect(
    connectionString,
    function(err, client) {
      var query = client.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [request.body.username, request.body.password]
      );

      query.on("error", function(err) {
        console.log(err);
      });

      query.on("end", function() {
        response.sendStatus(200);
        client.end();
      });
    }
  );
});

//  User authenticated
router.get("/", function(req, res, next) {
  res.send(req.isAuthenticated());
});

module.exports = router;
