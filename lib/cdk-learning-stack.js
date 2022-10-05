const { Stack, Duration } = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const s3 = require("aws-cdk-lib/aws-s3");
const sns = require("aws-cdk-lib/aws-sns");
const sqs = require("aws-cdk-lib/aws-sqs");
const subscriptionsSns = require("aws-cdk-lib/aws-sns-subscriptions");
const lambdaEventSources = require("aws-cdk-lib/aws-lambda-event-sources");
const nodejs = require("aws-cdk-lib/aws-lambda-nodejs");

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
    
    
    new nodejs.NodejsFunction(this, 'MyFunction', {
      entry: '/src/lambda.js', // accepts .js, .jsx, .ts, .tsx and .mjs files
      handler: 'main', // defaults to 'handler'
    });

//     const helloLambda = new lambda.Function(this, "AddTodoLambdaFunction", {
//       runtime: lambda.Runtime.NODEJS_14_X, // execution environment
//       code: lambda.Code.fromAsset("src"), // code loaded from "lambda" directory
//       handler: "lambda.main", // file is "hello", function is "handler"
//       environment: {
//         BUCKET: bucket.bucketName,
//       },
//     });

    // create new topic linked to current stack
    // const topic = new sns.Topic(this, "Topic");

    // create new queue
    const queue = new sqs.Queue(this, "queue111");

    // do not create topic, use already existing one
    const topic = sns.Topic.fromTopicArn(
      this,
      "topic2",
      "arn:aws:sns:us-east-1:909852739473:topic2"
    );

    topic.addSubscription(new subscriptionsSns.SqsSubscription(queue));

    const eventSource = new lambdaEventSources.SqsEventSource(queue, {
      batchSize: 2, // default
      // batchSize: 2, // default
      maxBatchingWindow: Duration.minutes(5),
      // reportBatchItemFailures: true, // default to false
    });
    helloLambda.addEventSource(eventSource);

    // queue.addSubscription(new subscriptionsSqs.LambdaSubscription(helloLambda));
    bucket.grantReadWrite(helloLambda); // give our lambda IAM permissions to access the lambda
  }
}

module.exports = { CdkLearningStack };
