# dappdeathnote

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```
### Deploy a new contract
at the root directory, you have to create a '.env' file with your Ethereum [INFURA API](https://infura.io/) url:

```js
INFURA_URL = "https://rinkeby.infura.io/v3/...";
// You can also use this link: https://rinkeby.infura.io/v3/aa7a461490244b65a54e2f67b959fa8a
```
Create a '.secret' file containing your ethereum wallet mnemonic (12 words, from metamask):
```
pistol cat dog etc...
```
You need Truffle installed:

```shell
$ npm install -g truffle@5.0.21
```

Then compile the contracts:

```shell
$ truffle compile
```

Then deploy you contract on the ethereum test network of your choice (configs on the 'truffle-config.js'):

```shell
$ truffle migrate --network=rinkeby
```

Finallyse your '.env' file by adding your deployed contract address:

```js
FACTORY_CONTRACT_ADDRESS = "0x8...";
// or you can use the following deployed contract: 0xB005bCAfb16751Ad408d7C4bBe3A15349c0E2Bec
```

Runs the app:

```
npm run start
```
To interact with the application, you need Metamask installed on your browser !