import { WalletDisconnectButton } from "@features/wallet/components/WalletDisconnectButton";
import { WalletOptions } from "@features/wallet/components/WalletOptions";
import { useAccount } from "wagmi";

export function ConnectWallet() {
  const { isConnected } = useAccount();

  return <>{isConnected ? <WalletDisconnectButton /> : <WalletOptions />}</>;
}
