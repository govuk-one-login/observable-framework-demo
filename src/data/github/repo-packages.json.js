import "dotenv/config";
import { Octokit, App } from "octokit";

const { GITHUB_TOKEN }  = process.env;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

const searchString = "org:govuk-one-login+front"

const searchResults = await octokit.rest.search.repos({
  q: searchString,
  per_page: 100
});

const repos = [];

for (const repo of searchResults.data.items.filter((repo) => { return repo.name.endsWith("front") })) {
  console.warn(`setting: ${repo.owner.login} - ${repo.name}`)

  const packageContentsResponse = await octokit.rest.repos.getContent({
    owner: repo.owner.login,
    repo: repo.name,
    branch: "main",
    path: "package.json"
  })

  console.warn(packageContentsResponse);

    repos.push({
      "owner": repo.owner,
      "name": repo.name,
      "packageJSON": JSON.parse(Buffer.from(packageContentsResponse.data.content, 'base64').toString())
    });
}

process.stdout.write(JSON.stringify(repos, null, 2));
