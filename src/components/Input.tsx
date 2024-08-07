import type { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const StyledInput = styled.input<StyledInputProps>`
  box-sizing: border-box;
  min-height: 38px;
  width: 100%;
  padding: 2px 0.75rem;
  border-radius: 4px;
  border: 1px solid lightgray;
  background-color: white;
  color: hsl(0, 0%, 20%);
  font-size: 1rem;
`;
export function Input({ ...props }) {
  return <StyledInput {...props} />;
}
