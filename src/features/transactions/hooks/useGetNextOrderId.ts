import { abi } from "@contracts/abi";
import { BOBSepoliaContractAddress } from "@wagmi";
import { useReadContract } from "wagmi";

export function useGetNextOrderId() {
  const { data: nextOrderId, isLoading: isGetNextOrderIdLoading } =
    useReadContract({
      abi,
      address: BOBSepoliaContractAddress,
      functionName: "nextOrderId",
    });

  return {
    nextOrderId,
    isGetNextOrderIdLoading,
  };
}
