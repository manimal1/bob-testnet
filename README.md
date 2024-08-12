# Build On Bitcoin - testnet

[BOB ("Build on Bitcoin")](https://docs.gobob.xyz/) is a first-of-its-kind hybrid Layer-2 powered by Bitcoin and Ethereum. This is a proof-of-concept (POC) to interact with and test one of their contracts.

## Instructions to setup app and run locally

1. Install [latest node version](https://nodejs.org/en/download/current/)
2. Set up your [MetaMask](https://metamask.io/) browser wallet
3. Get Sepolia from a trusted faucet
4. Bridge your Sepolia to the BOB testnet and get WBTC and USDC coins from that testnet. Follow the process [here](https://docs.gobob.xyz/docs/learn/guides/use-bob#bob-sepolia-testnet), and use the `old` testnet:

chainId: 111,\
rpcUrl: https://testnet.rpc.gobob.xyz, \
blockExplorer: https://testnet-explorer.gobob.xyz/, \

5. install dependencies with any package manager - `pnpm install`
6. launch app - `pnpm dev`

## Contract Details

The contract this POC interacts with is `0xE0Fd942cEa2f2e56f26AAC279F8D0F280bF52d7C`.

You will find all the code and transaction details on the [blockscount site](https://testnet-explorer.gobob.xyz/address/0xE0Fd942cEa2f2e56f26AAC279F8D0F280bF52d7C?tab=contract_code).
