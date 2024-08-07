import { Button, Heading, Input } from "@components";
import { ErcOrderToAccept } from "@features/transactions/write/acceptErcOrsderTransaction/components/ErcOrderToAccept";
import { useCallback, useState } from "react";
import { formatUnits } from "viem";

export default function AcceptErcOrderTx() {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [orderId, setOrderId] = useState(0n);

  const handleGetOrder = useCallback(() => {
    if (orderId === 0n) return null;
    setIsOrderOpen(true);
  }, [orderId]);

  return (
    <section style={{ width: "100%" }}>
      <Heading>Get ERC Order</Heading>
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
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setOrderId(BigInt(e.currentTarget.value))
            }
            // disabled={isFormDisabled}
          />
        </div>
      </div>
      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <Button onClick={handleGetOrder} disabled={orderId === 0n}>
          Get Order
        </Button>
      </div>

      {isOrderOpen ? <ErcOrderToAccept orderId={orderId} /> : null}
    </section>
  );
}
