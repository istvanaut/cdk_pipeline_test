import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";
import {ManualApprovalStep} from "aws-cdk-lib/pipelines";
import {MyPipelineAppStage} from "./stage";

export class CdkPipelineTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyTestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('istvanaut/cdk_pipeline_test', 'main'),
        commands: ['npm ci','npm run build','npx cdk synth']
      })
    })

    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: {account: "849243743924", region: "eu-central-1"}
    }));

    testingStage.addPost(new ManualApprovalStep("Manual approval before staging"));

    const stagingStage = pipeline.addStage(new MyPipelineAppStage(this, "staging", {
      env: {account: "849243743924", region: "eu-central-1"}
    }));

    stagingStage.addPost(new ManualApprovalStep("Manual approval before prod"));

    const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {
      env: {account: "849243743924", region: "eu-central-1"}
    }))
  }
}
