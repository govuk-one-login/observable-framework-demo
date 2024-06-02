
# 34 - GitHub Packages - AWS - Display

```js run=false
const allRepositories = FileAttachment("data/github/repo-packages.json").json();
```

```js
const allRepositories = FileAttachment("data/github/repo-packages.json").json();
```

```js run=false
const awsSDKPackages = _.reduce(allRepositories, (acc, repo) => {
    const filteredPackages = _.pickBy(repo.packageJSON.dependencies, (version, packageName) => { 
        return packageName.includes("aws")
    });

    acc = acc.concat(_.map(filteredPackages, (version, packageName) => {
        return {
        owner: repo.owner.login,
        name: repo.name.replace("ipv-", ""),
        packageName: packageName,
        version: version 
    }
    }))

    return acc;
}, []);
```

```js
const awsSDKPackages = _.reduce(allRepositories, (acc, repo) => {
    const filteredPackages = _.pickBy(repo.packageJSON.dependencies, (version, packageName) => { 
        return packageName.includes("aws")
    });

    acc = acc.concat(_.map(filteredPackages, (version, packageName) => {
        return {
        owner: repo.owner.login,
        name: repo.name.replace("ipv-", ""),
        packageName: packageName,
        version: version 
    }
    }))

    return acc;
}, []);
```

<div class="card">
  <h1>@aws-sdk packages in CRI frontends</h1>
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
            Plot.cell(awsSDKPackages, {x: "name", y: "packageName", fill: "version", inset: 0.5}),
            Plot.text(awsSDKPackages, {x: "name", y: "packageName", text: (d) => d.version, fill: "white", title: "title"})
        ]
    })
  )}
</div>
