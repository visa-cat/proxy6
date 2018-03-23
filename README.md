# Proxy6 API

This is a simple Promise-based module to work with [Proxy6 API](https://proxy6.net/developers) that supports basic filters and extended errors;

## Usage
### Available methods:
* getPrice
* getCount
* getCountry
* getProxy
* setType
* setDescr
* buy
* prolong
* deleteProxy
* check
* getUserInfo

### Example
```javascript
const P6 = require('node-proxy6');
let pp = new PP('aaaaaaaaaa-bbbbbbbbbb-cccccccccc');

//Get price for 100 IPv4 proxy for 30 days
p6.getPrice(100,30,4)
.then(results=>{
    ...
})

//Get user balance. This data is updated after each request you made;
p6.getUserInfo()
.then(user=>{
	//{ userId: '53458', balance: '98.32', currency: 'RUB' }
})
```