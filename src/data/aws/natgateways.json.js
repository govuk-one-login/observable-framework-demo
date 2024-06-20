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

import { EC2Client, DescribeNatGatewaysCommand } from "@aws-sdk/client-ec2"; // ES Modules import

const load = async () => {
  for (const account of accounts) {
    console.warn(`Scanning ${account.name} in ${account.environment}`);

    const client = new EC2Client({
      credentials: fromSSO({ profile: account.profile }),
    });

    const input = {};

    const command = new DescribeNatGatewaysCommand(input);

    account.natGateways = [];

    let response;

    try {
      console.warn("....");
      response = await client.send(command);

      console.warn(response[0]);

      account.natGateways.push(response.NatGateways);
    } catch (e) {
      console.error(e);

      continue;
    }
  }

  console.warn("DONE");

  return accounts;
};

process.stdout.write(JSON.stringify(await load(), null, 2));
