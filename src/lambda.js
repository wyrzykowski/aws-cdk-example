//# sourceMappingURL=index.js.map

const AWS = require("aws-sdk");
const S3 = new AWS.S3();
var _ = require('lodash');
//require('source-map-support').install();

const bucketName = process.env.BUCKET;

exports.main = async function (event, context) {
  const res = _.chunk(['a', 'b', 'c', 'd'], 2);
  console.log('res', res)
   console.log("BUCKET NAME", process.env.BUCKET)
  
   throw new Error("Example error here")
  
  
  
  try {
    console.log("Entering Lambda!");
    console.log("event", JSON.stringify(event));
    console.log("context", JSON.stringify(context));
    const data = await S3.listObjectsV2({ Bucket: bucketName }).promise();
    
   
    
    
    

    console.log(data);
  } catch (error) {
    return {
      statusCode: 400,
      headers: {},
      body: JSON.stringify(error),
    };
  }
};
