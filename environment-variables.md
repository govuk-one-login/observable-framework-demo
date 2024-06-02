# Environment variables

## API tokens

Environment variables can be set for local development using a `.env` file. An example file is included as a starting point.

| Name                  | Description                                                         | 
| :-------------------- | :------------------------------------------------------------------ | 
| GITHUB_TOKEN | API token created in https://github.com/settings/tokens?type=beta in the format of `ACCESS_TOKEN` |
| JIRA_TOKEN | API token created in https://id.atlassian.com/manage-profile/security/api-tokens in the format of `EMAIL_ADDRESS:ACCESS_TOKEN` |
| SONARCLOUD_TOKEN | API token created in https://sonarcloud.io/account/security in the format of `ACCESS_TOKEN` |

## General

| Name                  | Description                                                         | 
| :-------------------- | :------------------------------------------------------------------ | 
| AWS_ACCOUNT_NAMES     | List of aws profiles from `~/.aws/config` in CSV format             |
