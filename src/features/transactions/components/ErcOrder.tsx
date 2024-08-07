import type { OpenERCOrdersType } from "@features/transactions/hooks/useGetOpenErcOrders";

interface ErcOrderProps {
  order: OpenERCOrdersType;
  orderNumber?: string;
}

const structuredKeyNames = [
  "offeringAmount",
  "offeringToken",
  "askingAmount",
  "askingToken",
  "requesterAddress",
];

export function ErcOrder({ order, orderNumber }: ErcOrderProps) {
  const renderOrderValues = (order: OpenERCOrdersType) => {
    const values = Object.values(order);
    return structuredKeyNames.map((key, i) => (
      <p key={key}>
        <span
          style={{
            color: "var(--primary-color)",
            filter: "brightness(120%)",
          }}
        >
          {key}:
        </span>{" "}
        {values[i].toString()}
      </p>
    ));
  };

  return (
    <div
      style={{
        border: "1px solid lightgrey",
        padding: "1rem",
        margin: "1rem 0",
      }}
    >
      <h3
        style={{
          color: "var(--primary-color)",
          filter: "brightness(140%)",
        }}
      >
        {orderNumber ? `Open Order ${orderNumber}` : "Order"}
      </h3>
      {renderOrderValues(order)}
    </div>
  );
}
