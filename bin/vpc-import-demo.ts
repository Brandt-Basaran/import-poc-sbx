#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcImportDemoStack } from '../lib/vpc-import-demo-stack';

const app = new cdk.App();
new VpcImportDemoStack(app, 'VpcImportDemoStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
