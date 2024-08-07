import { BOBSepoliaContractAddress } from "@wagmi";
import { useMemo } from "react";
import { type Address, erc20Abi } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export interface ApproveContractProps {
  tokenAddress: Address;
  amount: bigint;
  // units: number;
}

export function useApproveTransaction() {
  const marketplaceAddress = BOBSepoliaContractAddress;

  const {
    data: contractHash,
    writeContractAsync: approve,
    isPending,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isApprovalConfirmed } =
    useWaitForTransactionReceipt({
      hash: contractHash,
    });

  const isApprovalPending = useMemo(
    () => isPending || isConfirming,
    [isPending, isConfirming]
  );

  const handleApprove = async ({
    tokenAddress,
    amount,
    // units,
  }: ApproveContractProps) => {
    try {
      await approve({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [marketplaceAddress, amount],
      });
      console.log("Approval successful");
    } catch (error) {
      console.error("Approval failed", error);
    }
  };

  return {
    isApprovalConfirmed,
    isApprovalPending,
    handleApprove,
  };
}
