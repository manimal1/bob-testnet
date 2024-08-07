import { Button } from "@components";
import { useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <Button primary key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </Button>
  ));
}
