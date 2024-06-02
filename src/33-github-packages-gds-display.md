
# 33 - GitHub Packages - GDS - Display

.
## Load repository data

```js run=false
const allRepositories = FileAttachment("data/github/repo-packages.json").json();
```

```js
const allRepositories = FileAttachment("data/github/repo-packages.json").json();
```

```js run=false
display(allRepositories)
```

```js
display(allRepositories)
```

## Filter by @govuk-one-login

```js run=false
display(
    Object.keys(
        allRepositories[0].packageJSON.dependencies).filter((packageName) => { 
            return packageName.startsWith("@govuk-one-login")
        }
    )
)
```

```js
display(
    Object.keys(
        allRepositories[0].packageJSON.dependencies).filter((packageName) => { 
            return packageName.startsWith("@govuk-one-login")
        }
    )
)
```

## Flatten data
```js run=false
const govukOneLoginPackages = _.reduce(allRepositories, (acc, repo) => {
    const filteredPackages = _.pickBy(repo.packageJSON.dependencies, (version, packageName) => { 
        return packageName.startsWith("@govuk-one-login")
    });

    console.log(filteredPackages)
    acc = acc.concat(_.map(filteredPackages, (version, packageName) => {
        return {
        owner: repo.owner.login,
        name: repo.name.replace("ipv-", ""),
        packageName: packageName.replace("@govuk-one-login/",""),
        version: version 
    }
    }))

    return acc;
}, []);
```

```js
const govukOneLoginPackages = _.reduce(allRepositories, (acc, repo) => {
    const filteredPackages = _.pickBy(repo.packageJSON.dependencies, (version, packageName) => { 
        return packageName.startsWith("@govuk-one-login")
    });

    console.log(filteredPackages)
    acc = acc.concat(_.map(filteredPackages, (version, packageName) => {
        return {
        owner: repo.owner.login,
        name: repo.name.replace("ipv-", ""),
        packageName: packageName.replace("@govuk-one-login/",""),
        version: version 
    }
    }))

    return acc;
}, []);
```

```js
display(govukOneLoginPackages)
```

## Display as Grid

```js run=false
Plot.plot({
        width: width,
        padding: 0,
        marginLeft: 300,
        grid: true,
        y: {label: "Package"},
        color: {type: "linear", scheme: "PiYG"},
        marks: [
            Plot.axisX({anchor: "top", text: (d) => _.replace(d, "-front", "")}),
            Plot.cell(govukOneLoginPackages, {x: "name", y: "packageName", fill: "version", inset: 0.5}),
            Plot.text(govukOneLoginPackages, {x: "name", y: "packageName", text: (d) => d.version, fill: "white", title: "title"})
        ]
    })
  )}
```
<div class="card">
  <h1>@govuk-one-login packages in CRI frontends</h1>
  ${
    resize((width) => Plot.plot({
        width: width,
        padding: 0,
        marginLeft: 300,
        grid: true,
        y: {label: "Package"},
        color: {type: "linear", scheme: "PiYG"},
        marks: [
            Plot.axisX({anchor: "top", text: (d) => _.replace(d, "-front", "")}),
            Plot.cell(govukOneLoginPackages, {x: "name", y: "packageName", fill: "version", inset: 0.5}),
            Plot.text(govukOneLoginPackages, {x: "name", y: "packageName", text: (d) => d.version, fill: "white", title: "title"})
        ]
    })
  )}
</div>

<hr />

## Display as a Grid (previous)

```js
const allRepositoriesPrevious = FileAttachment("data/github/repo-packages-previous.json").json();
```

```js
display(allRepositoriesPrevious)
```

```js
const govukOneLoginPackagesPrevious = _.reduce(allRepositoriesPrevious, (acc, repo) => {
    const filteredPackages = _.pickBy(repo.packageJSON.dependencies, (version, packageName) => { 
        return packageName.startsWith("@govuk-one-login")
    });

    console.log(filteredPackages)
    acc = acc.concat(_.map(filteredPackages, (version, packageName) => {
        return {
        owner: repo.owner.login,
        name: repo.name.replace("ipv-", ""),
        packageName: packageName.replace("@govuk-one-login/",""),
        version: version 
    }
    }))

    return acc;
}, []);
```

<div class="card">
  <h1>@govuk-one-login packages in CRI frontends (previous)</h1>
  ${
    resize((width) => Plot.plot({
        width: width,
        padding: 0,
        marginLeft: 300,
        grid: true,
        y: {label: "Package"},
        color: {type: "linear", scheme: "PiYG"},
        marks: [
            Plot.axisX({anchor: "top", text: (d) => _.replace(d, "-front", "")}),
            Plot.cell(govukOneLoginPackagesPrevious, {x: "name", y: "packageName", fill: "version", inset: 0.5}),
            Plot.text(govukOneLoginPackagesPrevious, {x: "name", y: "packageName", text: (d) => d.version, fill: "white", title: "title"})
        ]
    })
  )}
</div>


