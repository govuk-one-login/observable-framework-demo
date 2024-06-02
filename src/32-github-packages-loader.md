# 32 - GitHub Packages - Data Loader

```js run=false

import "dotenv/config";
import { Octokit, App } from "octokit";

const { GITHUB_TOKEN }  = process.env;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

const searchString = "org:govuk-one-login+front"

// Search for repositories
const searchResults = await octokit.rest.search.repos({
  q: searchString,
  per_page: 100
});

const repos = [];

// For each repo
for (const repo of searchResults.data.items.filter((repo) => { return repo.name.endsWith("front") })) {
  console.warn(`setting: ${repo.owner.login} - ${repo.name}`)

  // ... Get all root package.json
  const packageContentsResponse = await octokit.rest.repos.getContent({
    owner: repo.owner.login,
    repo: repo.name,
    branch: "main",
    path: "package.json"
  })

  console.warn(packageContentsResponse);

  // ... and add decoded JSON structure to repo config
  repos.push({
    "owner": repo.owner,
    "name": repo.name,
    "packageJSON": JSON.parse(Buffer.from(packageContentsResponse.data.content, 'base64').toString())
  });
}

process.stdout.write(JSON.stringify(repos, null, 2));
```