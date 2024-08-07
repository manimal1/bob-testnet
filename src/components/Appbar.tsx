import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styled from "styled-components";

interface AppbarProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

const StyledAppbar = styled.div<Omit<AppbarProps, "chldren">>`
  position: fixed;
  top: 0;
  bottom: auto;
  left: 0;
  right: 0;
  height: auto;
  background: var(--bg-secondary);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
  z-index: 10;
`;

export function Appbar({ children, ...props }: AppbarProps) {
  return <StyledAppbar {...props}>{children}</StyledAppbar>;
}
