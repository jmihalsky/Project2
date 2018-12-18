// require("dotenv").config({path: "./aws.env"});
// var aws_conn = require("./aws_conn.js");
var multer = require("multer");
var multers3 = require("multer-s3");
var aws = require("aws-sdk");

// var aws_conn_keys = aws_conn.aws_keys;

// console.log(aws_conn_keys);

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-1'
});

var s3 = new aws.S3();

console.log(s3);

var fileFiler = (req,file,cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else
    {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed"), false);
    }
}

var upload = multer({
    storage: multers3({
        s3: s3,
        bucket: aws_conn_keys.s3_bucket,
        acl: "public-read",
        metadata: function(req,file,cb){
            cb(null, {fieldName: file.originalname});
        },
        key: function(req,file,cb){
            cb(null, file.originalname);
        }
    })
});

module.exports = upload;