import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigw from '@aws-cdk/aws-apigateway'
import * as s3 from '@aws-cdk/aws-s3'

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // defines an AWS Lambda resource
    const henLambda = new lambda.Function(this, 'HrMsgHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,    // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory
      handler: 'hr-on-msg.handler'            // file is "hello", function is "handler"
    });
    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, 'henradio2', {
      handler: henLambda
    });

    const bucket = new s3.Bucket(this, 'HenRadioCompressBucket')
    const cfnBucket = bucket.node.defaultChild as s3.CfnBucket
    cfnBucket.accelerateConfiguration = {
      accelerationStatus: 'Enabled',
    }
  }
}