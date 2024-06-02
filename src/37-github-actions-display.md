# 37 - GitHub Actions - Display


```js
import { extractGitHubActionsFromRepository } from "./components/extract-github-actions.js";

import semver from "npm:semver"
```

```js
const allRepositories = FileAttachment("data/github/gha-packages.json").json();
```

## Raw Data
```js run=false
display(allRepositories)
```

```js
display(allRepositories)
```

## Direct property access
```js run=false
display(allRepositories[0].github_action_files["codeql.yml"].jobs["analyze"].steps[0].uses)
```

```js
display(allRepositories[0].github_action_files["codeql.yml"].jobs["analyze"].steps[0].uses)
```

## Restructure data
```js run=false
import { extractGitHubActionsFromRepository } from "./components/extract-github-actions.js";

const actions = _.reduce(allRepositories, (acc, repo) => {
    acc = acc.concat(extractGitHubActionsFromRepository(repo));
    return acc;
}, []);
```

```js
const actions = _.reduce(allRepositories, (acc, repo) => {
    acc = acc.concat(extractGitHubActionsFromRepository(repo));
    return acc;
}, []);
```

```js
display(actions)
```

## Actions: govuk-one-login/devplatform-upload-action-ecr
```js run=false
const devPlatformUploadECRActions = actions.filter((action) => {
    return action.uses.startsWith("govuk-one-login/devplatform-upload-action-ecr");
})
```
```js
const devPlatformUploadECRActions = actions.filter((action) => {
    return action.uses.startsWith("govuk-one-login/devplatform-upload-action-ecr");
})

display(devPlatformUploadECRActions);
```

## Actions: govuk-one-login/devplatform-upload-action-ecr >= 1.2.4
```js run=false
import semver from "npm:semver"

const inDateActions = devPlatformUploadECRActions.filter((action) => {
    const version = action.uses.replace("govuk-one-login/devplatform-upload-action-ecr@", "");

    return semver.gte(version, "1.2.4")
})
```
```js
const inDateActions = devPlatformUploadECRActions.filter((action) => {
    const version = action.uses.replace("govuk-one-login/devplatform-upload-action-ecr@", "");

    return semver.gte(version, "1.2.4")
})

display(inDateActions)
```


## Actions: govuk-one-login/devplatform-upload-action-ecr < 1.2.4
```js run=false
const outOfDateActions = devPlatformUploadECRActions.filter((action) => {
    const version = action.uses.replace("govuk-one-login/devplatform-upload-action-ecr@", "");

    return semver.lt(version, "1.2.4")
})
```

```js
const outOfDateActions = devPlatformUploadECRActions.filter((action) => {
    const version = action.uses.replace("govuk-one-login/devplatform-upload-action-ecr@", "");

    return semver.lt(version, "1.2.4")
})

display(outOfDateActions)
```

## Invert to groupBy actions

```js run=false
const actionVersions = _.groupBy(actions.filter((action) => {
    return (action.uses.startsWith("govuk-one-login/") || action.uses.startsWith("alphagov/"));
}), "uses")
```

```js
const actionVersions = _.groupBy(actions.filter((action) => {
    return (action.uses.startsWith("govuk-one-login/") || action.uses.startsWith("alphagov/"));
}), "uses")

display(actionVersions);
```
