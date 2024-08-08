import { BOBSepoliaContractAddress } from "@wagmi";
import { useMemo } from "react";
import { type Address, erc20Abi } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export interface ApproveContractProps {
  tokenAddress: Address;
  amount: bigint;
}

export function useApproveTransaction() {
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
  }: ApproveContractProps) => {
    try {
      await approve({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [BOBSepoliaContractAddress, amount],
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
