import { Heading } from "@components";
import { useAccount, useConnect, useEnsName } from "wagmi";

export default function AccountRoute() {
  const { address, chainId, status } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { error } = useConnect();

  return (
    <>
      <Heading>Account</Heading>
      <div>
        <div>
          <b>Address:</b>&nbsp;
          {ensName ? `${ensName} (${address})` : address}
        </div>
        <b>ChainId:</b>&nbsp;{chainId}
        <div>
          <b>Status:</b> {status}
        </div>
      </div>
      {error ? <div>Error: {error?.message}</div> : null}
    </>
  );
}
