import { abi } from "@contracts/abi";
import { BOBSepoliaContractAddress } from "@wagmi";
import { useReadContract } from "wagmi";

export function useGetErcOrderById(orderId: bigint) {
  if (!orderId || orderId === 0n)
    return { order: undefined, isGetNextErcOrderByIdLoading: false };

  const { data: order, isLoading: isGetNextErcOrderByIdLoading } =
    useReadContract({
      abi,
      address: BOBSepoliaContractAddress,
      functionName: "ercErcOrders",
      args: [orderId],
    });

  return {
    order,
    isGetNextErcOrderByIdLoading,
  };
}
