import styled, { css } from "styled-components";
import { type ButtonHTMLAttributes } from "react";
import { Spinner } from "./Spinner";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  $variant?: "filled" | "unfilled";
  children: React.ReactNode;
}

const filledStyles = css`
  background: #621b0c;
  color: #fff;
  border: 2px solid #621b0c;
  box-shadow: 4px 6px 8px 0 rgba(122, 47, 25, 0.3);

  &:hover {
    background: transparent;
    color: #621b0c;
    box-shadow: 6px 10px 4px 0 rgba(122, 47, 25, 0.7);
  }

  &:disabled {
    background: #534e4e;
    border-color: #42592a;
    cursor: not-allowed;
    box-shadow: none;
    color: #ccc;
  }
`;

const unfilledStyles = css`
  background: transparent;
  color: #621b0c;
  border: 2px solid #621b0c;
  box-shadow: none;

  &:hover {
    background: #621b0c;
    color: #fff;
    box-shadow: 4px 6px 8px 0 rgba(122, 47, 25, 0.3);
  }

  &:disabled {
    background: transparent;
    border-color: #534e4e;
    color: #534e4e;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const StyledButton = styled.button<{ $variant: "filled" | "unfilled" }>`
  height: 3.75rem;
  width: 100%;
  min-width: 17.5rem;
  border-radius: 0.75rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.5s ease;
  border: none;

  &:focus {
    outline: none;
  }

  ${({ $variant }) => ($variant === "filled" ? filledStyles : unfilledStyles)}

  input + & {
    margin-top: 1.5rem;
  }
`;

export function Button({
  isLoading,
  children,
  $variant = "filled",
  ...props
}: Props) {
  return (
    <StyledButton disabled={isLoading} $variant={$variant} {...props}>
      {isLoading ? <Spinner /> : children}
    </StyledButton>
  );
}
