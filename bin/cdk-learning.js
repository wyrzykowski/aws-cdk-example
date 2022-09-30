#!/usr/bin/env node
const cdk = require("aws-cdk-lib");
const { CdkLearningStack } = require("../lib/cdk-learning-stack");

const app = new cdk.App();
const cdkLearningStack = new CdkLearningStack(
  app,
  "aws-node-http-api-project-dev",
  {
    env: { account: "909852739473", region: "us-east-1" },
    /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
  }
);

// Add a tag to all constructs in the stack
cdk.Tags.of(cdkLearningStack).add("s1", "labweek");
