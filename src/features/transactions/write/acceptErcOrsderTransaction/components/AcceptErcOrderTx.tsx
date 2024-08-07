import { Button, Heading, Input } from "@components";
import { ApproveTransaction } from "@features/transactions/components/ApproveTransaction";
import { useAcceptERCOrder } from "@features/transactions/hooks/useAcceptErcOrder";
import { type SyntheticEvent, useCallback, useState } from "react";
import { type Address, formatUnits } from "viem";

interface AcceptErcOrderTxProps {
  orderId: bigint;
  saleAmount: bigint;
  tokenAddress: Address;
}

export function AcceptErcOrderTx({
  orderId,
  saleAmount,
  tokenAddress,
}: AcceptErcOrderTxProps) {
  const [isApprovalPending, setIsApprovalPending] = useState(false);
  const { isOrderAccepted, isOrderPending, acceptERCOrder } =
    useAcceptERCOrder();

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if (!orderId || !saleAmount) {
        throw new Error("You are missing some data!");
      }

      await acceptERCOrder({
        id: orderId,
        saleAmount,
      });
    },
    [orderId, saleAmount, acceptERCOrder]
  );

  return (
    <>
      <ApproveTransaction
        tokenAddress={tokenAddress}
        amount={saleAmount}
        setIsApprovalPending={setIsApprovalPending}
      />
      <Heading>Accept ERC Order</Heading>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <label htmlFor="orderId">Order ID</label>
          <div>
            <Input
              required
              name="orderId"
              type="number"
              min={0}
              aria-label="order ID"
              placeholder="order ID"
              value={formatUnits(orderId, 0)}
              disabled
            />
          </div>
        </div>
        <div>
          <label htmlFor="saleAmount">Sale Amount</label>
          <div>
            <Input
              required
              name="saleAmount"
              type="number"
              min={0}
              aria-label="sale amount"
              placeholder="sale amount"
              value={formatUnits(saleAmount, 0)}
              disabled
            />
          </div>
        </div>
        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <Button type="submit" disabled={isApprovalPending || isOrderAccepted}>
            Submit
          </Button>
        </div>
        <h3>{isOrderPending ? "Order is pending..." : null}</h3>
      </form>
    </>
  );
}
