import { Heading, Input } from "@components";
import { ErcOrder } from "@features/transactions/components/ErcOrder";
import {
  OpenERCOrders,
  useGetOpenErcOrders,
} from "@features/transactions/hooks/useGetOpenErcOrders";
import { toAddress } from "@utils";
import { Fragment, useCallback, useMemo, useState } from "react";
import { isAddress } from "viem";

export default function OpenErcOrdersRoute() {
  const { openErcOrders, isGetOpenErcOrdersLoading } = useGetOpenErcOrders();

  const [filterValue, setFilterValue] = useState("");
  const [filteredOrders, setFilteredÕrders] = useState<OpenERCOrders>([]);

  const handleFilterOrders = useCallback(
    (address: string) => {
      setFilterValue(address);

      if (!openErcOrders) return null;

      if (!address.length || !isAddress(toAddress(address))) {
        return setFilteredÕrders([]);
      }

      const filteredOrders = openErcOrders?.filter(
        (order) => order.requesterAddress === address
      );
      setFilteredÕrders(filteredOrders);
    },
    [openErcOrders]
  );

  const orders = useMemo(
    () =>
      openErcOrders
        ? filteredOrders && filteredOrders.length > 0
          ? filteredOrders
          : openErcOrders
        : null,
    [filteredOrders, openErcOrders]
  );

  return (
    <>
      <Heading>Open ERC Orders</Heading>
      <Input
        value={filterValue}
        placeholder="filter by Requester Address"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          handleFilterOrders(e.currentTarget.value)
        }
      />
      <h3>{isGetOpenErcOrdersLoading ? "Loading open orders..." : null}</h3>
      <section>
        {orders
          ? orders.map((order, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Fragment key={`order-${i}`}>
                <ErcOrder order={order} orderNumber={`${i + 1}`} />
              </Fragment>
            ))
          : null}
      </section>
    </>
  );
}
