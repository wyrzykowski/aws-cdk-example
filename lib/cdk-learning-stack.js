const { Stack, Duration } = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const s3 = require("aws-cdk-lib/aws-s3");

class CdkLearningStack extends Stack {
  /**
   *
   * @param {Construct} scope
   *
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    const bucket = new s3.Bucket(this, "Store"); //note that it appends everything

    const helloLambda = new lambda.Function(this, "AddTodoLambdaFunction", {
      runtime: lambda.Runtime.NODEJS_14_X, // execution environment
      code: lambda.Code.fromAsset("src"), // code loaded from "lambda" directory
      handler: "lambda.main", // file is "hello", function is "handler"
      environment: {
        BUCKET: bucket.bucketName,
      },
    });

    bucket.grantReadWrite(helloLambda); // give our lambda IAM permissions to access the lambda
  }
}

module.exports = { CdkLearningStack };
