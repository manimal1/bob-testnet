import { Heading } from "@components";
import { useGetNextOrderId } from "@features/transactions/hooks/useGetNextOrderId";

export default function NextOrderIdRoute() {
  const { nextOrderId, isGetNextOrderIdLoading } = useGetNextOrderId();

  return (
    <>
      <Heading>Find Next ERC Order ID</Heading>
      <p>
        <b>Next Order ID:</b>&nbsp;
        {isGetNextOrderIdLoading ? "...Loading" : nextOrderId?.toString()}
      </p>
    </>
  );
}
