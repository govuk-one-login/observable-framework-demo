# 58 - AWS Alarms

<div class="note" label="Questions">

- What 5xx alarms do we have across accounts?
- What alarms are configured with PagerDuty urls?

</div>

## Accounts

```js
const accounts = FileAttachment("data/aws/alarms.json").json();
```

```js
display(accounts)
```


## Flattened as Alarms
```js
const alarms = _.reduce(accounts, (acc, account) => {
  return acc.concat(_.map(account.alarms.MetricAlarms, (alarm) => {
    return {
      profile: account.profile,
      project: account.project,
      group: account.group,
      environment: account.environment,
      name: account.name,
      ...alarm
    }
  }));
},[]);

// const actionVersions = _.groupBy(actions.filter((action) => {
//     return (action.uses.startsWith("govuk-one-login/") || action.uses.startsWith("alphagov/"));
// }), "uses")

display(alarms);
```

## Unique Alarm Types
```js run=false
const alarmTypes = _.uniq(_.flattenDeep(accounts.map((account) => {
  return account.alarms.MetricAlarms.map((alarm)=> {
    return `${alarm.Namespace} - ${alarm.MetricName}`
  })
})).sort());
```

```js
const alarmTypes = _.uniq(_.flattenDeep(accounts.map((account) => {
  return account.alarms.MetricAlarms.map((alarm)=> {
    return `${alarm.Namespace} - ${alarm.MetricName}`
  })
})).sort());

display(alarmTypes)
```

## 5xx Alarms
```js run=false
const alarms5xx = accounts.map((account)=>{
  return {
    ...account,
    alarms: {
      MetricAlarms: account.alarms.MetricAlarms.filter((alarm) => {
        return alarm.AlarmName.toLowerCase().includes("5xx")
      })
    }
  }
})
```

```js
const alarms5xx = accounts.map((account)=>{
  return {
    ...account,
    alarms: {
      MetricAlarms: account.alarms.MetricAlarms.filter((alarm) => {
        return alarm.AlarmName.toLowerCase().includes("5xx")
      })
    }
  }
})

display(alarms5xx)
```

```js
const alarmTypes = [
  "4xx",
  "5xx",
  "front-",
  "api-",
  "statemachine",
  "function",
  "latency",
  "throttles",
  "stepscale",
  "apigw"
]
```

```js
const groupedAlarms = accounts.map((account)=>{
  return {
    ...account,
    "5xxAlarms": {
      "5xx": account.alarms.MetricAlarms.filter((alarm) => {
        return alarm.AlarmName.toLowerCase().includes("5xx")
      })
    },
    grouped: _.groupBy(account.alarms.MetricAlarms, (alarm) => {
        if (alarm.AlarmName.toLowerCase().includes("5xx")) {
          return "5xx"
        }

        return "other";
      })
  }
})
```

```js
display(groupedAlarms)
```

<div class="card" style="padding: 0;">
${Inputs.table(groupedAlarms)}
</div>
