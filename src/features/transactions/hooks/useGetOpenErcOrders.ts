import { abi } from "@contracts/abi";
import { BOBSepoliaContractAddress } from "@wagmi";
import { useMemo } from "react";
import type { Address } from "viem";
import { useReadContract } from "wagmi";

export interface OpenERCOrdersType {
  offeringAmount: bigint;
  offeringToken: Address;
  askingAmount: bigint;
  askingToken: Address;
  requesterAddress: Address;
}

export type OpenERCOrders = OpenERCOrdersType[] | undefined;

export function useGetOpenErcOrders() {
  const { data: openErcOrders, isLoading: isGetOpenErcOrdersLoading } =
    useReadContract({
      abi,
      address: BOBSepoliaContractAddress,
      functionName: "getOpenOrders",
    });

  const openOrders = useMemo(
    () => (openErcOrders ? openErcOrders[0] : undefined),
    [openErcOrders]
  );

  return {
    openErcOrders: openOrders,
    isGetOpenErcOrdersLoading,
  };
}
