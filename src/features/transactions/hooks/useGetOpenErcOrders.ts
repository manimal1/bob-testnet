import { abi } from "@contracts/abi";
import { BOBSepoliaContractAddress } from "@wagmi";
import { useMemo } from "react";
import type { Address } from "viem";
import { useReadContract } from "wagmi";

export type OpenERCOrderById = readonly [
  bigint,
  Address,
  bigint,
  Address,
  Address,
];

export type OpenERCOrder = {
  offeringAmount: bigint;
  offeringToken: `0x${string}`;
  askingAmount: bigint;
  askingToken: `0x${string}`;
  requesterAddress: `0x${string}`;
};

export type OpenERCOrders = readonly OpenERCOrder[];

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
