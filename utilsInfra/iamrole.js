const aws = require('@pulumi/aws');

async function createEc2CloudWatchIamRole() {
  const role = new aws.iam.Role('myEC2Role', {
    assumeRolePolicy: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: 'ec2.amazonaws.com',
          },
        },
      ],
    }),
    tags: {
      'tag-key': 'cloudwatchAgentServer',
    },
  });

  // Attach the CloudWatchAgentServerPolicy policy to the role
  const policyAttachment = new aws.iam.RolePolicyAttachment(
    'myEC2RolePolicyAttachment',
    {
      policyArn: 'arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy',
      role: role.name,
    }
  );

  return role.arn;
}

module.exports = { createEc2CloudWatchIamRole };