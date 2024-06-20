# 41 - GitHub Teams

```js
const repos =  FileAttachment("data/github/repo-stats.json").json();
```

```js
const repoTeams = repos.reduce((acc, repo) => {
    return acc.concat(repo.groups.reduce((repoacc, group) => {
        repoacc.push({repo: repo.name, group: group.name, permission: group.permission })
        return repoacc;
    },[]))
}, [])
```

```js
// display(repoTeams)
```

```js
vl
  .markSquare()
  .data(repoTeams)
  .encode(
    vl.x().fieldN('group'),
    vl.y().fieldN('repo'),
    vl
      .color()
      .fieldN('permission')
      .scale({ scheme: "tableau10" })
  )
//   config(
//     vl.axis().grid(true)
//   )
  .width(1024)
  .height(800)
  .render()
```