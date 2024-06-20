import "dotenv/config";
import { Octokit, App } from "octokit";


const { GITHUB_TOKEN }  = process.env;

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: GITHUB_TOKEN });


const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
  owner: "octocat",
  repo: "hello-world",
  per_page: 100,
});

// // iterate through each response
// for await (const { data: issues } of iterator) {
//   for (const issue of issues) {
//     console.log("Issue #%d: %s", issue.number, issue.title);
//   }
// }


// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
const 
  data
 = await octokit.paginate(
  octokit.rest.actions.listWorkflowRunsForRepo, 
  {owner: 'govuk-one-login', repo: "ipv-cri-check-hmrc-api", branch: "main", per_page: 100}
);

process.stdout.write(JSON.stringify(data, null, 2));
