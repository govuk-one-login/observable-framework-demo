# 58 - AWS IP Addresses

<div class="note" label="Questions">

- What are the public IPs configured with our VPCs?

</div>

## Accounts
```js
const accounts = FileAttachment("data/aws/natgateways.json").json();
```

```js
display(accounts);
```

## Flattened as IP Addresses
```js
const ipAddresses = _.reduce(accounts, (acc, account) => {
  return acc.concat(_.reduce(account.natGateways, (acc, natGateway)=> {
    console.log(natGateway)
    return acc.concat(_.reduce(natGateway, (acc, natGatewayCollection) => {
      return acc.concat(_.reduce(natGatewayCollection.NatGatewayAddresses, (acc, address) => {
        return acc.concat({
          name: account.name,
          group: account.group,
          environment: account.environment,
          ...address
        })
      },[]))
    },[]))
  }, []))
},[])
```

```js
display(ipAddresses);
```


## IP Address Table

 <div class="card" style="padding: 0;">
${Inputs.table(ipAddresses, {
  columns: ["name", "environment","PublicIp"]
})}
</div>
