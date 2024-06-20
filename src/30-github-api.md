# 30 - Github API

<p>

## GitHub REST API

- [docs.github.com](https://docs.github.com/en/rest?apiVersion=2022-11-28)

```sh run=false
curl --request GET \
--url "https://api.github.com/octocat" \
--header "Authorization: Bearer YOUR-TOKEN" \
--header "X-GitHub-Api-Version: 2022-11-28"
```


## Octokit

- [octokit/rest.js](https://octokit.github.io/rest.js/v20)

```js run=false
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: "mypersonalaccesstoken123",
});

// sends request with `Authorization: token mypersonalaccesstoken123` header
const { data } = await octokit.request("/user");
```
