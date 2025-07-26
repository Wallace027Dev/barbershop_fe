import styled from "styled-components";
import { type ButtonHTMLAttributes } from "react";
import { Spinner } from "./Spinner";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

const StyledButton = styled.button`
  height: 3.75rem;
  width: 100%;
  min-width: 17.5rem;
  border: none;
  border-radius: 0.75rem;
  background: #621b0c;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.5rem;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.5s ease;
  border: 2px solid #621b0c;
  box-shadow: 4px 6px 8px 0 rgba(122, 47, 25, 0.3);
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: #534e4e;
    border: 2px solid #42592a;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    &:hover {
      background: transparent;
      box-shadow: 6px 10px 4px 0 rgba(122, 47, 25, 0.7);
      color: #621b0c;
    }
  }
`;

export function Button({ isLoading, children, ...props }: Props) {
  return (
    <StyledButton disabled={isLoading} {...props}>
      {isLoading ? <Spinner /> : children}
    </StyledButton>
  );
}
