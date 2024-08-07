import { ErcOrder } from "@features/transactions/components/ErcOrder";
import { useGetErcOrderById } from "@features/transactions/hooks/useGetErcOrderById";
import type { OpenERCOrdersType } from "@features/transactions/hooks/useGetOpenErcOrders";
import { AcceptErcOrderTx } from "@features/transactions/write/acceptErcOrsderTransaction/components/AcceptErcOrderTx";

export function ErcOrderToAccept({ orderId }: { orderId: bigint }) {
  const { order, isGetNextErcOrderByIdLoading } = useGetErcOrderById(orderId);

  if (isGetNextErcOrderByIdLoading) {
    return <h3>...Loading Order</h3>;
  }

  return (
    <>
      {!order ? (
        <h3>No order found!</h3>
      ) : (
        <>
          <ErcOrder order={order as unknown as OpenERCOrdersType} />
          <AcceptErcOrderTx
            orderId={orderId}
            saleAmount={order[0]}
            tokenAddress={order[1]}
          />
        </>
      )}
    </>
  );
}
