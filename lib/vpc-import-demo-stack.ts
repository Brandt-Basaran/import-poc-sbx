import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class VpcImportDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Import existing VPC by ID
    const importedVpc = ec2.Vpc.fromLookup(this, 'ImportedVPC', {
      vpcId: 'vpc-05c394ca33040dbdc' // Replace with your VPC ID
    });

    // Example: Create a security group in the imported VPC
    const securityGroup = new ec2.SecurityGroup(this, 'ExampleSecurityGroup', {
      vpc: importedVpc,
      description: 'Example security group in imported VPC',
      allowAllOutbound: true
    });

    // Add an inbound rule to the security group
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      'Allow HTTPS traffic'
    );

    // Output the imported VPC information
    new cdk.CfnOutput(this, 'ImportedVpcId', {
      value: importedVpc.vpcId,
      description: 'The ID of the imported VPC',
    });

    new cdk.CfnOutput(this, 'VpcCidr', {
      value: importedVpc.vpcCidrBlock,
      description: 'The CIDR range of the imported VPC',
    });

    new cdk.CfnOutput(this, 'SecurityGroupId', {
      value: securityGroup.securityGroupId,
      description: 'The ID of the created security group',
    });
  }
}
