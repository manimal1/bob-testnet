import { Button, Heading } from "@components";
import {
  type ApproveContractProps,
  useApproveTransaction,
} from "@features/transactions/hooks/useApproveTransaction";
import { useCheckAllowanceAmount } from "@features/transactions/hooks/useCheckAllowanceAmount";
import { type Dispatch, useCallback, useEffect } from "react";

interface ApproveTransactionProps extends ApproveContractProps {
  setIsApprovalPending: Dispatch<React.SetStateAction<boolean>>;
}

export function ApproveTransaction({
  tokenAddress,
  amount,
  setIsApprovalPending,
}: ApproveTransactionProps) {
  const { allowance, isAllowanceLoading } =
    useCheckAllowanceAmount(tokenAddress);

  const { isApprovalConfirmed, isApprovalPending, handleApprove } =
    useApproveTransaction();

  useEffect(() => {
    if (isAllowanceLoading || isApprovalPending) {
      return setIsApprovalPending(true);
    }

    setIsApprovalPending(false);
  }, [isAllowanceLoading, isApprovalPending, setIsApprovalPending]);

  const handleApproveTx = useCallback(async () => {
    if (!allowance || allowance < amount) {
      await handleApprove({ tokenAddress, amount });
    }
  }, [allowance, amount, tokenAddress, handleApprove]);

  return (
    <section style={{ marginBottom: "2rem" }}>
      <Heading>Approve Token Allowance</Heading>
      <p>
        A token allowance is required if you want a third-party to move funds on
        your behalf - i.e. BOB. In short, you are allowing them to move your
        tokens. If you have not already approved a token allowance, click the
        button below before sending the transaction in order to verify and
        approve the token transaction. Otherwise, your swap request might fail.
      </p>
      <Button
        disabled={isApprovalConfirmed || isApprovalPending}
        onClick={handleApproveTx}
      >
        Approve TX
      </Button>
    </section>
  );
}
