#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkPipelineTestStack } from '../lib/cdk_pipeline_test-stack';

const app = new cdk.App();
new CdkPipelineTestStack(app, 'CdkPipelineTestStack', {
    env: {
        account: '849243743924',
        region: 'eu-central-1'
    }
});

app.synth();
