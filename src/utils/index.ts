import { type Address, isAddress } from "viem";

export function toAddress(value: string): Address {
  const address = value.toLowerCase();

  if (isAddress(address)) {
    return address;
  }

  throw new Error("Invalid address");
}
