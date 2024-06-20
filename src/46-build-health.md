# 46 - Build Health

<div class="note" label="Questions">

- What builds are failing on the main branch?

</div>

## Pod Health Check In


```js
vl.render({
    spec: {
    "data": {
        "values": [
        {"category": "successful", "value": 88.6},
        {"category": "aborted", "value": 1.2},
        {"category": "failed", "value": 10.2}
        ]
    },
    "layer": [
        {"mark": {"type": "arc", "innerRadius": 50, "toolTip":true}},
        {
    "mark": {"type": "text", "radius": 110},
    "encoding": {
      "text": {"field": "value", "type": "nominal"}
    }
  },

    ],
    "encoding": {
        "theta": {"field": "value", "type": "quantitative"},
        "color": {"field": "category", "type": "nominal"}
    }
    }
})
```



<div class="note" label="Details">
<ul>
<li>backend</li>
<li>78.6%</li>
<li>+ 1.6% change</li>
<li>number of projects: 5</li>
<li>Total lines: 7,251</li>
<li>Total lines to cover: 1,693</li>
</ul>
</div>
