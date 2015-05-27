var aws = require('aws-sdk');

module.exports = function(api) {

  var options = {
    apiVersion      : '2014-03-28',
    sslEnabled      : true,
    accessKeyId     : api.config.aws.credentials.access_key,
    secretAccessKey : api.config.aws.credentials.secret_key,
    region          : api.config.aws.region
  }

  var S3 = new aws.S3(options);

  return S3;
};

