# 44 - GitHub Branch Settings

```js
const repos = FileAttachment("data/github/repo-stats.json").json();
```

```js
display(repos)
```

## Main branch
### Checks

```js
const repoChecks = repos.reduce((acc, current) => {
  return acc.concat(current.main_branch.required_status_checks.checks.map((c) => ({
    name: current.name,
    check: c.context,
    enabled: true
  })))
}, []);

```

```js
vl
  .render({
    spec: {
    mark: "square",
    data: {values: repoChecks},
    width: 640,
    height: 400,
    encoding: {
      x: {field: "check", type: "nominal"},
      y: {field: "name", type: "nominal"},
      size: {field: "enabled", type: "nominal"}
    }
    }
  })
```

### Repo Rules
```js
const repoRules = repos.reduce((acc, current) => {
  acc.push({
    name: current.name,
    rule: "linear history",
    enabled: current.main_branch.required_linear_history.enabled
  },
  {
    name: current.name,
    rule: "dismiss stale",
    enabled: current.main_branch.required_pull_request_reviews.dismiss_stale_reviews
  },
  {
    name: current.name,
    rule: "last push review",
    enabled: current.main_branch.required_pull_request_reviews.require_last_push_approval
  })

  return acc
}, []);

```

```js
vl
  .render({
    spec: {
    mark: "square",
    data: {values: repoRules},
    width: 640,
    height: 400,
    encoding: {
      x: {field: "rule", type: "nominal"},
      y: {field: "name", type: "nominal"},
      size: {field: "enabled", type: "nominal"}
    }
    }
  })
```

### Branches
<div class="grid">
  <div class="card" style="padding: 0;">
    ${Inputs.table(
      repos
        .map((d) => ({
          "title": {name: d.name, full_name: d.full_name},
          "linear": d.main_branch.required_linear_history.enabled,
          "stale": d.main_branch.required_pull_request_reviews.dismiss_stale_reviews,
          "last push": d.main_branch.required_pull_request_reviews.require_last_push_approval
        })),
      {
        width,
        header: {
          title: "Repositories"
        },
        format: {
          title: (d) => html`<a href=https://github.com/${d.full_name} target=_blank>${d.name}</a>`
        }
      }
    )}
  </div>
</div>




