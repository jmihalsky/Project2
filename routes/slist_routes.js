var express = require("express");
var router = express.Router();
var slist = require("../models/slist.js");
var db = require("../smodels");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var path = require("path");
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var S3_BUCKET = process.env.S3_BUCKET;
var aws = require('aws-sdk');
aws.config.region = 'us-east-1';

let s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
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
  if(!req.user)
  {
    res.redirect("/login");
  }
  else
  {
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
    console.log("button clicked -" + file);
    uploadFile(file);
    //getSignedRequest(file);
  }
});

function uploadFile(file) {
  console.log("running uploadfile");

  var s3params = {
    Bucket: 'sh1tlist', // pass your bucket name
    Key: file.name,
    Expires: 60,
    ContentType: file.type,
    Body: file.data,
    ACL: 'public-read'
  };

  s3.upload(s3params, function (s3Err, data) {
    if (s3Err) throw s3Err
    console.log(`File uploaded successfully at ${data.Location}`)
  });
};

// function getSignedRequest(file) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         const response = JSON.parse(xhr.responseText);
//         uploadFile(file, response.signedRequest, response.url);
//       }
//       else {
//         console.log('Could not get signed URL.');
//       }
//     }
//   };
//   xhr.send();
// }

// function uploadFile(file, signedRequest, url) {
//   const xhr = new XMLHttpRequest();
//   xhr.open('PUT', signedRequest);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         console.log("photo uploaded: " + url);
//         // document.getElementById('preview').src = url;
//         // document.getElementById('avatar-url').value = url;
//       }
//       else {
//         console.log('Could not upload file.');
//       }
//     }
//   };
//   xhr.send(file);
// }

// //getting signed url from aws
// router.get('/sign-s3', (req, res) => {
//   const s3 = new aws.S3();
//   const fileName = req.query['file-name'];
//   const fileType = req.query['file-type'];
//   const s3Params = {
//     Bucket: S3_BUCKET,
//     Key: fileName,
//     Expires: 60,
//     ContentType: fileType,
//     ACL: 'public-read'
//   };

//   s3.getSignedUrl('putObject', s3Params, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.end();
//     }
//     const returnData = {
//       signedRequest: data,
//       url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
//     };
//     res.write(JSON.stringify(returnData));
//     res.end();
//   });
// });


// comment - post route
router.post("/api/comments/:id", function (req, res) {
  if(!req.user)
  {
    res.redirect("/login");
  }
  else
  {
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
router.post("/newlocation", function(req, res) {
  if(!req.user)
  {
    res.redirect("/login");
  }
  else
  {
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
      function(sposts) {
        var slistposts = {
          sposts: sposts
        };
        res.render("index", slistposts);
      }
    );
  }
});

router.post("/api/signup",function(req,res){
  console.log(req.body);
  db.Usr.create({
    username: req.body.username,
    pword: req.body.pword,
    email: req.body.email
  }).then(function(){
    res.redirect(307,"/api/login");
  }).catch(function(err){
    res.json(err);
  });
});

router.post("/api/login", passport.authenticate("local"),function(req,res){
  console.log(req.user);
  res.json("/");
});

module.exports = router;
