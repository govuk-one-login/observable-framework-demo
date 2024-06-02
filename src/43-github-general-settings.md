# 43 - GitHub General Settings

```js
const repos = FileAttachment("data/github/repo-stats.json").json();
```

```js
display(repos)
```

## Repositories

### Open Issues
```js
vl.render({
  spec: {
    width: 800,
    height: 500,
    data: {
      values: repos
    },
    mark: "bar",
    encoding: {
      x: {field: "name", type: "nominal", axis: {labelAngle: 0, title: "Repository"}},
      y: {field: "open_issues_count", type: "quantitative",
      axis: {title: "Open Issues"}}
    }
  }
})
```

### Collaboration Settings

```js
const repoProperties = repos.reduce((acc, current) => {
  acc.push({
    name: current.name,
    type: "issues",
    enabled: current.has_issues
  },
  {
    name: current.name,
    type: "projects",
    enabled: current.has_projects
  },
  {
    name: current.name,
    type: "downloads",
    enabled: current.has_downloads
  },
  {
    name: current.name,
    type: "wiki",
    enabled: current.has_wiki
  },
  {
    name: current.name,
    type: "discussions",
    enabled: current.has_discussions
  })

  return acc;
}, []);

```

```js
vl
  .render({
    spec: {
    mark: "square",
    data: {values: repoProperties},
    width: 640,
    height: 400,
    encoding: {
      x: {field: "type", type: "nominal"},
      y: {field: "name", type: "nominal"},
      size: {field: "enabled", type: "nominal"}
    }
    }
  })
```

