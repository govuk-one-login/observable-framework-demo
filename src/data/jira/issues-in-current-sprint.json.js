import "dotenv/config";

const jira = await fetch(
  "https://govukverify.atlassian.net/rest/api/3/search?jql=project%20%3D%20OJ%20AND%20sprint%20IN%20openSprints%28%29",
  {
    method: "GET",
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.JIRA_TOKEN).toString(
        "base64"
      )}`,
      Accept: "application/json",
    },
  }
);

process.stdout.write(JSON.stringify(await jira.json(), null, 2));
