import type { Address } from "viem";

interface Asset {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
}

export const WBTC: Asset = {
  address: "0x2868d708e442a6a940670d26100036d426f1e16b",
  name: "Wrapped BTC",
  symbol: "WBTC",
  decimals: 8,
};

export const USDC: Asset = {
  address: "0x27c3321E40f039d10D5FF831F528C9CEAE601B1d",
  name: "USD Coin",
  symbol: "USDC",
  decimals: 6,
};

export const Assets = [WBTC, USDC];
