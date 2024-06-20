import "dotenv/config";
import { Octokit, App } from "octokit";
import YAML from 'yaml'

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

  // ... Get all the workflows
  const ghaFiles = await octokit.rest.repos.getContent({
    owner: repo.owner.login,
    repo: repo.name,
    branch: "main",
    path: ".github/workflows"
  })

  console.warn(JSON.stringify(ghaFiles, null, 2));

  const ghasContent = {};

  // For each workflow 
  for(const ghaFile of ghaFiles.data) {
    console.warn(ghaFile.name);

    // ... Get the contents
    const ghaFilePromise = await fetch(ghaFile.download_url);

    // Convert YAML into JSON
    ghasContent[ghaFile.name] = YAML.parse(await ghaFilePromise.text())
  }

  repos.push({
    "owner": repo.owner,
    "name": repo.name,
    "github_action_files": ghasContent
  });
}

process.stdout.write(JSON.stringify(repos, null, 2));
