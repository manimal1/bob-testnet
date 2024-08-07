import { abi } from "@contracts/abi";
import { BOBSepoliaContractAddress } from "@wagmi";
import type { Address } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export function usePlaceERCOrder() {
  const {
    data: contractHash,
    isPending,
    writeContractAsync,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isOrderConfirmed } =
    useWaitForTransactionReceipt({
      hash: contractHash,
    });

  const isOrderPending = isPending || isConfirming;

  const placeERCOrder = async ({
    sellingToken,
    saleAmount,
    buyingToken,
    buyAmount,
  }: {
    sellingToken: Address;
    saleAmount: bigint;
    buyingToken: Address;
    buyAmount: bigint;
  }) => {
    try {
      const result = await writeContractAsync({
        abi,
        address: BOBSepoliaContractAddress,
        functionName: "placeErcErcOrder",
        args: [sellingToken, saleAmount, buyingToken, buyAmount],
      });
      console.log("Transaction result: ", result);
    } catch (error) {
      console.error("Error placing ERC Order: ", error);
    }
  };

  return {
    isOrderConfirmed,
    isOrderPending,
    placeERCOrder,
  };
}
