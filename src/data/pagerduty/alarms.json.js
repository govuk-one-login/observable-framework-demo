import "dotenv/config";


// https://api.pagerduty.com
// /services


// const fetch = require('node-fetch');

const url = 'https://api.pagerduty.com/services?limit=100';
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token token=${process.env.PAGER_DUTY_TOKEN}`
  }
};

const response = await fetch(url, options);
const data = await response.json();

process.stdout.write(JSON.stringify(data, null, 2));
