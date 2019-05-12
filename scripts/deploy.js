const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const mime = require('mime-types');
const chardet = require('chardet');

const accessKeyId = process.env.CENTCOM_DEPLOY_UI_ACCESS_KEY;
const secretAccessKey = process.env.CENTCOM_DEPLOY_UI_SECRET_KEY;
const region = 'nyc3';  // New York region by default
const filePath = './dist';
const bucketName = 'centcom-ss13';

const spacesEndpoint = new AWS.Endpoint(region + '.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
});

fs.readdirSync(filePath).forEach(subPath => {
  const fullPath = `${filePath}\\${subPath}`;
  const readStream = fs.createReadStream(fullPath);
  const params = {
    Bucket: bucketName,
    Key: subPath,
    Body: readStream,
    ContentType: `${mime.lookup(subPath)};charset=${chardet.detectFileSync(fullPath)}`,
    ACL: 'public-read',
  };

  console.log('Uploading using params: ', params);

  const options = {
    partSize: 10 * 1024 * 1024, // 10 MB
    queueSize: 10
  };

  s3.upload(params, options, function (err, data) {
    if (!err) {
      console.log(data); // successful response
    } else {
      console.log(err); // an error occurred
    }
  });
});