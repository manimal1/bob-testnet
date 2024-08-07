import type { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $primary?: string;
}

interface ButtonProps extends Omit<StyledButtonProps, "primary"> {
  primary?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  background: lightgray;
  border-radius: 6px;
  border: 2px solid lightgray;
  color: white;
  padding: 1em;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    filter: brightness(80%);
  }

  ${(props) =>
    props.$primary &&
    css`
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: white;
    `};
`;

export function Button({ primary = false, children, ...props }: ButtonProps) {
  return (
    <StyledButton $primary={primary.toString()} {...props}>
      {children}
    </StyledButton>
  );
}
