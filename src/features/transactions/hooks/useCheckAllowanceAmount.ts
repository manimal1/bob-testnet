import { BOBSepoliaContractAddress } from "@wagmi";
import { type Address, erc20Abi } from "viem";
import { useAccount, useReadContract } from "wagmi";

export function useCheckAllowanceAmount(tokenAddress: Address) {
  const { address: userAddress } = useAccount();

  const { data: allowance, isLoading: isAllowanceLoading } = useReadContract<
    /* biome-ignore lint/suspicious/noExplicitAny: <explanation> */
    any,
    /* biome-ignore lint/suspicious/noExplicitAny: <explanation> */
    any,
    /* biome-ignore lint/suspicious/noExplicitAny: <explanation> */
    any,
    /* biome-ignore lint/suspicious/noExplicitAny: <explanation> */
    any,
    bigint
  >({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [userAddress, BOBSepoliaContractAddress],
  });

  return { allowance, isAllowanceLoading };
}
