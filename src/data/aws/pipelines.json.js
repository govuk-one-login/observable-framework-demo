// Load account names from environment, and restructure into objects
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

import {
  CodePipelineClient,
  ListPipelinesCommand,
  GetPipelineStateCommand,
} from "@aws-sdk/client-codepipeline";

const load = async () => {
  console.warn("---------------");
  // for each acount ...
  for (const account of accounts) {
    console.warn(`Scanning ${account.name} in ${account.environment}`);

    const client = new CodePipelineClient({
      credentials: fromSSO({ profile: account.profile }),
    });
    const input = {};

    // ... load all pipelines
    const command = new ListPipelinesCommand(input);

    let response;

    account.pipelines = [];

    try {
      console.warn("....");
      response = await client.send(command);

      console.warn(response);

      // ... for each pipeline
      for (const pipeline of response.pipelines) {
        console.warn(pipeline);

        const getPipelineStateCommand = new GetPipelineStateCommand({
          name: pipeline.name,
        });

        // ... load pipeline state
        const pipelineState = await client.send(getPipelineStateCommand);

        account.pipelines.push(pipelineState);
      }
    } catch (e) {
      console.error(e);

      continue;
    }
  }

  console.warn("DONE");

  return accounts;
};

process.stdout.write(JSON.stringify(await load(), null, 2));
