var AWS = require('aws-sdk');
var s3 = new AWS.S3({
  signatureVersion: 'v4',
});


exports.handler = (event, context, callback) => {
  const url = s3.getSignedUrl('putObject', {
    Bucket: 'cdkworkshopstack-bucket83908e77-1ojw9gyxpwhp2',
    Key: 'UploadedFile',
    Expires: 600,
  });

  callback(null, url);
};