import { Button } from "@components";
import { useDisconnect } from "wagmi";

export function WalletDisconnectButton() {
  const { disconnect } = useDisconnect();

  return (
    <Button primary onClick={() => disconnect()}>
      Disconnect
    </Button>
  );
}
