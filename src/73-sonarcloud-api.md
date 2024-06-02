# 73 - SonarCloud

<div class="note" label="Questions">

- Which SonarCloud runs have occurred recently?

</div>


## Loader

```js run=false
import "dotenv/config";

const sonarProjects = await fetch(`https://sonarcloud.io/api/projects/search?organization=govuk-one-login&q=cri`, {
    headers: {
        Authorization: `Bearer ${process.env.SONARCLOUD_TOKEN}` 
    }
});

process.stdout.write(JSON.stringify(await sonarProjects.json(), null, 2));
```


## Accounts
```js
const sonarCloudAccountsRaw = FileAttachment("data/sonarcloud/projects.json").json();
```

```js
display(sonarCloudAccountsRaw)
```

# Graph 

```js
vl
  .markSquare()
  .data(sonarCloudAccountsRaw.components)
  .encode(
    vl.x().fieldO('lastAnalysisDate'),
    vl.y().fieldN('name'),
    vl
      .color()
      .fieldN('visibility')
      .scale({ range: ["yellow", "red", "green"] })
  )
  .width(1024)
  .height(800)
  .render()
```

# Graph by Date

```js
vl
  .markSquare()
  .data(sonarCloudAccountsRaw.components)
  .encode(
    vl.x().fieldT('lastAnalysisDate'),
    vl.y().fieldN('name'),
    vl
      .color()
      .fieldN('visibility')
      .scale({ range: ["yellow", "red", "green"] })
  )
  .width(1024)
  .height(800)
  .render()
```