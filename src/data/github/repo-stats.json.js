import "dotenv/config";
import { Octokit, App } from "octokit";


const { GITHUB_TOKEN }  = process.env;

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: GITHUB_TOKEN });


const searchString = "topic:cri-orange+org:govuk-one-login+fork:true"

const searchResults = await octokit.rest.search.repos({
  q: searchString,
  per_page: 100
});

const repos = [];

for (const repo of searchResults.data.items) {
  console.warn(`setting: ${repo.owner.login} - ${repo.name}`)

  const setting = await octokit.rest.repos.getBranchProtection({
    owner: repo.owner.login,
    repo: repo.name,
    branch: "main"
  });

  const contributors = await octokit.rest.repos.listContributors({
    owner: repo.owner.login,
    repo: repo.name
  });

  const metrics = await octokit.rest.repos.getCommunityProfileMetrics({
    owner: repo.owner.login,
    repo: repo.name
  })

  const groups = await octokit.rest.repos.listTeams({
    owner: repo.owner.login,
    repo: repo.name
  });

    repos.push({
      ...repo, 
      main_branch: setting.data, 
      contributors: contributors.data, 
      communityMetrics: metrics.data,
      groups: groups.data
    });
  // console.warn(serepotting);

}

console.warn(repos[0].contributors.map((c) => {return `${c.login} - ${c.contributions}`}));

console.warn(repos[0].groups)
  // const dataDebug = await octokit.rest.repos.getBranchProtection({
//   owner: 'govuk-one-login', 
//   repo: "ipv-cri-check-hmrc-front", 
//   branch: "main"
// });

// console.log(dataDebug);

// const 
//   data
//  = await octokit.paginate(
//   octokit.rest.actions.listWorkflowRunsForRepo, 
//   { owner: 'govuk-one-login', repo: "ipv-cri-check-hmrc-api", branch: "main", per_page: 100}
// );

process.stdout.write(JSON.stringify(repos, null, 2));
