import "dotenv/config";

const { AWS_ACCOUNT_NAMES } = process.env;

const accounts = AWS_ACCOUNT_NAMES.split(",").map((accountName) => {
  const account = {};

  const profileParts = accountName.split("-");
  account.project = profileParts.slice(0, profileParts.length - 2).join("-");
  account.group = profileParts[profileParts.length - 2];
  account.environment = profileParts[profileParts.length - 1];
  account.name = `${account.project}-${account.group}`;
  account.profile = accountName;

  return account;
});

import { fromSSO } from "@aws-sdk/credential-provider-sso";
import { SSMClient, DescribeParametersCommand } from "@aws-sdk/client-ssm";

const load = async () => {
  for (const account of accounts) {
    console.warn(`Scanning ${account.name} in ${account.environment}`);

    const client = new SSMClient({
      credentials: fromSSO({ profile: account.profile }),
    });

    const parametersCommand = new DescribeParametersCommand({
      MaxResults: 50,
    });

    const parameters = await client.send(parametersCommand);

    account.parameters = parameters;

    console.warn(parameters);
    // console.warn(`count: ${parameters.length}`);
    console.warn(`token: ${parameters.NextToken}`);
  }

  return accounts;
};

process.stdout.write(JSON.stringify(await load(), null, 2));
