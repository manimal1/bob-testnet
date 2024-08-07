import { type Chain, defineChain } from "viem";
import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";

export const BOBSepoliaContractAddress =
  "0xe0fd942cea2f2e56f26aac279f8d0f280bf52d7c";

const BOBSepolia = {
  id: 111,
  name: "BOB Sepolia",
  nativeCurrency: {
    name: "Sepolia",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.rpc.gobob.xyz"],
    },
    public: {
      http: ["https://testnet.rpc.gobob.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "BOB Sepolia Explorer",
      url: "https://testnet-explorer.gobob.xyz/",
    },
  },
  contracts: {
    ensRegistry: {
      address: BOBSepoliaContractAddress,
    },
  },
} as const satisfies Chain;

const BOBSepoliaTestnet = {
  id: 808813,
  name: "BOB Sepolia (Testnet)",
  nativeCurrency: {
    name: "Sepolia",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://bob-sepolia.rpc.gobob.xyz"],
    },
    public: {
      http: ["https://bob-sepolia.rpc.gobob.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "BOB Sepolia Explorer",
      url: "https://bob-sepolia.explorer.gobob.xyz/",
    },
  },
  contracts: {
    ensRegistry: {
      address: BOBSepoliaContractAddress,
    },
  },
} as const satisfies Chain;

export const BOBSepoliaChain = defineChain(BOBSepolia);
export const BOBSepoliaTestnetChain = defineChain(BOBSepoliaTestnet);

export const wagmiConfig = createConfig({
  chains: [sepolia, BOBSepoliaChain, BOBSepoliaTestnetChain],
  transports: {
    [sepolia.id]: http(),
    [BOBSepolia.id]: http(),
    [BOBSepoliaTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
