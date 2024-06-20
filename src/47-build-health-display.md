# 47 - Build Health - Display

```js
const reposViaScript = FileAttachment("data/github/workflow-runs.json").json();
```

## Raw Builds

```js
display(reposViaScript)
```

```js
const filteredRepos = reposViaScript.filter((r)=> {
    return new Date(r.run_started_at).getTime() > new Date(2024, 2, 1)
});

const criJobsWithDurations = filteredRepos.map((r) => {
    return {
        minutes: (new Date(r.updated_at).getTime() - new Date(r.run_started_at).getTime())/1000/60,
        ...r
    }
})
```

## Jobs with Durations

```js
display(criJobsWithDurations)
```


```js
vl
  .markSquare()
  .data(criJobsWithDurations)
  .encode(
    vl.x().fieldO('created_at'),
    vl.y().fieldN('name'),
    vl
      .color()
      .fieldN('conclusion')
      .scale({ range: ["yellow", "red", "green"] }),
    vl.size().fieldQ('minutes')
  )
  .width(1024)
  .height(800)
  .render()
```