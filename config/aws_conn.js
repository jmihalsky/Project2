console.log("this is loaded");

module.exports.aws_keys = {
    access_key_id: process.env.AWS_ACCESS_KEY_ID,
    secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    s3_bucket: process.env.S3_BUCKET
};