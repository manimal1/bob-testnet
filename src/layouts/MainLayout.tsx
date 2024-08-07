import avatar from "@assets/avatar-fallback.jpg";
import { Appbar } from "@components";
import { NavMenu } from "@features/navigation/NavMenu";
import { ConnectWallet } from "@features/wallet/ConnectWallet";
import { Outlet } from "react-router-dom";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";

export function MainLayout() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  return (
    <>
      <Appbar>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
            alt="ENS Avatar"
            src={ensAvatar ? ensAvatar : avatar}
          />
          <ConnectWallet />
        </div>
      </Appbar>

      <main>
        <div style={{ display: "flex" }}>
          <NavMenu />
          <div
            style={{
              marginTop: "80px",
              padding: "1rem",
              marginLeft: "9rem",
              maxWidth: "640px",
              minWidth: "640px",
            }}
          >
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
