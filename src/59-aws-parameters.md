# 58 - AWS Parameters

<div class="note" label="Questions">

- Which parameters are clickopsed, and which are applied via IaC?

</div>

.

```js
const accounts = FileAttachment("data/aws/parameters.json").json();
```

```js
display(accounts)
```


## Flattened as Parameters

```js
const parameters = _.reduce(accounts, (acc, account) => {
  return acc.concat(_.map(account.parameters.Parameters, (parameter) => {
    return {
      profile: account.profile,
      project: account.project,
      group: account.group,
      environment: account.environment,
      name: account.name,
      ...parameter
    }
  }));
},[]);
```

```js
display(parameters)
```

## All Parameters

<div class="card" style="padding: 0;">
${Inputs.table(parameters)}
</div>


## Grouped
```js
const acceleratorParameters = parameters.filter((p)=> { return p.ARN.toLowerCase().includes("accelerator")})
const pipelineParameters = parameters.filter((p) => { 
    return p.LastModifiedUser.toLowerCase().includes("pipeline")  || p.LastModifiedUser.toLowerCase().includes("deployrole")
})
const controlTowerParameters = parameters.filter((p) => { return p.LastModifiedUser.toLowerCase().includes("controltower")})
const remainingParameters = _.difference(parameters, acceleratorParameters.concat(pipelineParameters, controlTowerParameters));
```

### Accelerator Parameters
<div class="card" style="padding: 0;">
${Inputs.table(acceleratorParameters)}
</div>

### Control Tower Parameters
<div class="card" style="padding: 0;">
${Inputs.table(controlTowerParameters)}
</div>

### Pipeline Parameters
<div class="card" style="padding: 0;">
${Inputs.table(pipelineParameters)}
</div>

### Remaining Parameters
<div class="card" style="padding: 0;">
${Inputs.table(remainingParameters)}
</div>
