# 76 - Pager Duty

<div class="note" label="Questions">

- What PagerDuty alarms are configured for non-production and production?

</div>

## Raw Services

```js
const pagerDuty = FileAttachment("data/pagerduty/alarms.json").json();
```

```js
display(pagerDuty)
```

## Non-production alarms
```js
Inputs.table(pagerDuty.services.filter((s)=> {
    return s.name.toLowerCase().replaceAll(" ", "").replaceAll("-", "").includes("nonprod")
}))
```

## Production alarms

```js
Inputs.table(pagerDuty.services.filter((s)=> {
    return (s.name.toLowerCase().includes("prod") && !s.name.toLowerCase().replaceAll(" ", "").replaceAll("-", "").includes("nonprod"))
    // return 
    // s.name.toLowerCase().replaceAll(" ", "").replaceAll("-", "").includes("nonprod")
    // &&
    // s.name.toLowerCase().includes("prod")
}))
```

