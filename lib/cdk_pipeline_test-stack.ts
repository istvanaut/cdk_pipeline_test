import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";
import {ManualApprovalStep} from "aws-cdk-lib/pipelines";

export class CdkPipelineTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyTestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('istvanaut/cdk_pipeline_test', 'main'),
        commands: ['npm ci','npm run build','npx cdk synth']
      })
    })

  }
}
