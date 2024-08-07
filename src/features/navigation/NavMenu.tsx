import {
  StyledMenuOption,
  StyledMenuSection,
} from "@features/navigation/NavMenuStyles";
import { RoutePaths } from "@routes/RoutePaths";
import { useLocation, useNavigate } from "react-router-dom";

export function NavMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const selected = (routePath: string) => location.pathname === routePath;

  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--bg-secondary)",
        height: "100vh",
        width: "auto",
        marginTop: "80px",
        minWidth: "8rem",
      }}
    >
      <StyledMenuSection
        $selected={selected(RoutePaths.HOME)}
        onClick={() => {
          navigate(RoutePaths.HOME);
        }}
      >
        Account
      </StyledMenuSection>
      <StyledMenuSection>
        Read
        <StyledMenuOption
          $selected={selected(RoutePaths.NEXT_ORDER)}
          onClick={() => {
            navigate(RoutePaths.NEXT_ORDER);
          }}
        >
          Next Order
        </StyledMenuOption>
        <StyledMenuOption
          $selected={selected(RoutePaths.OPEN_ERC_ORDERS)}
          onClick={() => {
            navigate(RoutePaths.OPEN_ERC_ORDERS);
          }}
        >
          Open Orders
        </StyledMenuOption>
      </StyledMenuSection>
      <StyledMenuSection>
        Write
        <StyledMenuOption
          $selected={selected(RoutePaths.PLACE_ERC_ORDER)}
          onClick={() => {
            navigate(RoutePaths.PLACE_ERC_ORDER);
          }}
          onKeyUp={() => false}
        >
          Place Order
        </StyledMenuOption>
        <StyledMenuOption
          $selected={selected(RoutePaths.ACCEPT_ERC_ORDER)}
          onClick={() => {
            navigate(RoutePaths.ACCEPT_ERC_ORDER);
          }}
          onKeyUp={() => false}
        >
          Accept Order
        </StyledMenuOption>
      </StyledMenuSection>
    </div>
  );
}
