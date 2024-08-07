import { abi } from "@contracts/abi";
import { BOBSepoliaContractAddress } from "@wagmi";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export function useAcceptERCOrder() {
  const {
    data: contractHash,
    isPending,
    writeContractAsync,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isOrderAccepted } =
    useWaitForTransactionReceipt({
      hash: contractHash,
    });

  const isOrderPending = isPending || isConfirming;

  const acceptERCOrder = async ({
    id,
    saleAmount,
  }: {
    id: bigint;
    saleAmount: bigint;
  }) => {
    try {
      const result = await writeContractAsync({
        abi,
        address: BOBSepoliaContractAddress,
        functionName: "acceptErcErcOrder",
        args: [id, saleAmount],
      });
      console.log("Transaction result: ", result);
    } catch (error) {
      console.error("Error accepting ERC Order: ", error);
    }
  };

  return {
    isOrderAccepted,
    isOrderPending,
    acceptERCOrder,
  };
}
