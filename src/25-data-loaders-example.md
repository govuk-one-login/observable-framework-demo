# 25 - Data Loaders Example


File: `docs/data/geo.json.sh`

```bash
curl https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
```


```js 
const geo = FileAttachment("data/geo.json").csv({typed: true})
```

```js
display(geo)
```