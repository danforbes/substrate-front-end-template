# BCA Test UI

The purpose of this project is to demonstrate the capabilities of the RMRK platform for NFTs (non-fungible tokens) as they relate to the Blockchain.art minimum viable product.

## Launch

In order to deploy this project locally, it's necessary to first launch a local development instance of the Kusama Network.

### Kusama Network

This project was developed against [Kusama runtime v0.9.0](https://github.com/paritytech/polkadot/releases/tag/v0.9.0). Linux users may download [a prebuilt executable](https://github.com/paritytech/polkadot/releases/download/v0.9.0/polkadot); other users will need to [build the Polkadot/Kusama executable](https://substrate.dev/docs/en/knowledgebase/getting-started/) in order to launch a local development instance of the Kusama Network. Once the executable is present, launch it with the following parameters:

``sh
--chain=kusama-dev --tmp --alice
```

### Build & Deploy

Use the following commands to build & deploy this project:

```sh
yarn install && yarn start
```

## Test UI

The test UI contains some elements from the Front-End Template, such as an account chooser in the upper-right corner, some components that display basic information about the chain (e.g. current & finalized block), and a table that displays a list of available accounts and their respective balances - below these components are the components of the test UI. In order to complete this demo, ensure that the Alice account is selected in the account chooser.

### RMRKs Table

The RMRKs table is meant to display a list of all the RMRK collections and tokens, however, it is not working. In order to observe the effects of the front-end interactions, open the browser console and refer to the log messages.

#### Bug

Expected behavior: the RMRK subscription method updates the state of the React component.

Actual behavior: changes to the state of the React component that are made from within the RMRK subscription do not have an effect.

### Create Collection

Fill out the Create Collection form with the following values to create a new collection:

```
Name: Foo
Max: 3
Symbol: FOO
```

Wait until a log message confirms the collection was created before proceeding.

### Create RMRK

Fill out the Create RMRK form with the following values to create a new token:

```
Collection: 070508030603050704-FOO
Name: NewToken
Instance: NewToken
SN: 0000000000000123
```

## Upstream

This project was forked from the Substrate Developer Hub Front-End Template.
