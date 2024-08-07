import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { css, styled } from "styled-components";

interface MenuSection extends ComponentPropsWithoutRef<"div"> {
  $selected?: boolean;
  children: ReactNode;
}

export const StyledMenuSection = styled.div<Omit<MenuSection, "chldren">>`
  padding: 1rem;
  border-bottom: 1px solid lightgrey;
  cursor: pointer;
  color: white;

  ${(props) =>
    props.$selected &&
    css`
      color: var(--primary-color);
    `};
`;

export const StyledMenuOption = styled.div<Omit<MenuSection, "chldren">>`
  text-indent: 0.75rem;
  color: white;
  cursor: pointer;

  ${(props) =>
    props.$selected &&
    css`
      color: var(--primary-color);
    `};
`;
