# 52 - AWS Pipelines - Display

<p>

## Accounts with nested Code Pipelines

```js
const accountsPipelines = FileAttachment("data/aws/pipelines.json").json();
```

```js
display(accountsPipelines);
```

## Flattened as Pipelines
```js
const pipelines = _.reduce(accountsPipelines, (acc, account) => {
  return acc.concat(account.pipelines.map((pipeline) => {
    return {
      accountProfile: account.profile,
      accountProject: account.project,
      accountGroup: account.group,
      accountEnvironment: account.environment,
      accountName: account.name,
      ...pipeline
    }
  }));
},[]);

display(pipelines);
```

## Flattened as Stages

```js
const stages = _.reduce(pipelines, (acc, account) => {
  return acc.concat(account.stageStates.map((stage) => {
    return {
      accountProfile: account.accountProfile,
      accountProject: account.accountProject,
      accountGroup: account.accountGroup,
      accountEnvironment: account.accountEnvironment,
      accountName: account.accountName,
      pipelineName: account.pipelineName,
      ...stage
    }
  }));
},[]);

display(stages);
```

## Paused

```js
const paused = stages.filter((stage)=> {
  return stage.inboundTransitionState.enabled != true
});

display(paused);
```

## Paused with Pretty formatting

```js
const pausedWithReasons = paused.map((stage) => {
  return {
    pipelineName: stage.pipelineName,
    disabledReason: stage.inboundTransitionState.disabledReason,
    disabledBy: stage.inboundTransitionState.lastChangedBy.split("/").filter((lcb)=>{return !lcb.startsWith("arn") && !lcb.startsWith("AWSReserved") && !lcb.match(/\d+/)}).join("/"),
    disabledDate: stage.inboundTransitionState.lastChangedAt
  }
})

```

 <div class="card" style="padding: 0;">
    ${Inputs.table(pausedWithReasons)}
  </div>

<!-- 
## Not succeeded

```js
const notSucceeded = stages.filter((stage)=> {
  return stage.latestExecution?.status !== "Succeeded"
});

display(notSucceeded);
```


const test = html`<h1>Test</h1><ul>${Array.from({length: 7}, (_, i) => html`<li> 

```js
const pausedHTML = html`<ul>${paused.map((stage) => {html`<li> Index: ${stage}</li>`})}</ul>`
```

${html`<table style="width: 180px;">
  <thead><tr><th>#</th><th>Color</th><th>Swatch</th></tr></thead>
  <tbody>${d3.schemeCategory10.map((color, i) => html.fragment`<tr>
    <td>${i}</td>
    <td>${color}</td>
    <td style=${{background: color}}></td>
  </tr>`)}</tbody>
</table>`}


<div class="card">
<h1>Paused Pipelines</h1>
${pausedHTML}
</div>

```js
const accountInput = Inputs.select(stages.map((d) => d.accountName), {unique: true, sort: true, label: "Account:"});
const account = Generators.input(accountInput);
```

```js
const filteredStages = stages.filter((d) => d.accountName === account)
display(account)
display(filteredStages)
```

<div class="card" style="display: flex; flex-direction: column; gap: 1rem;">
  ${accountInput}
  ${display(stages.filter((d) => d.accountName === account))}
  ${resize((width) => Plot.plot({
    width,
    y: {grid: true, label: "Unemployed (thousands)"},
    marks: [
      Plot.areaY(stages.filter((d) => d.accountName === account), {x: "date", y: "unemployed", fill: "var(--theme-foreground-muted)", curve: "step"}),
      Plot.lineY(industries.filter((d) => d.accountName === account), {x: "date", y: "unemployed", curve: "step"}),
      Plot.ruleY([0])
    ]
  }))}
</div>

# Toy 
<div class="grid grid-cols-3">
  <div class="card"><h1>Fetch</h1></div>
  <div class="card"><h1>Deploy</h1></div>
  <div class="card"><h1>Promote</h1></div>
</div>

# HMRC Check
<div class="grid">
  <div class="card">

## Alarms
### Other



  </div>
</div>


```js
const test = html`<h1>Test</h1><ul>${Array.from({length: 7}, (_, i) => html`<li> Index: ${i}</li>`)}</ul>`
```

<div>
${test}
</div> -->