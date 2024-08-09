import { USDC, WBTC } from "@contracts/assets";
import { Address } from "viem";

export interface Option {
  value: Address;
  label: string;
}
export interface TokenAmount {
  amount: bigint;
  units: number;
}

export interface FormErrors {
  buyAmount?: string;
  saleAmount?: string;
}

export const defaultSaleAmount = {
  amount: 0n,
  units: USDC.decimals,
};

export const defaultBuyAmount = {
  amount: 0n,
  units: WBTC.decimals,
};
