import styled from "styled-components";
import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  $hasError?: boolean;
  errorMessage?: string;
}

const StyledInput = styled.input<{ $hasError?: boolean }>`
  height: 3rem;
  width: 100%;
  min-width: 17.5rem;
  color: #130f0b;
  background: #d0ced1;
  font-size: 1rem;
  border-radius: 0.75rem;
  padding: 1.25rem 1rem;
  box-shadow: 4px 6px 8px 0 rgba(122, 47, 25, 0.3);
  transition: box-shadow 0.3s ease;
  border: 1px solid
    ${({ $hasError }) => ($hasError ? "#A60B0B" : "rgba(66, 89, 42, 0.5)")};

  &:focus {
    outline: none;
    border: 2px solid ${({ $hasError }) => ($hasError ? "#A60B0B" : "#42592a")};
  }

  &:hover {
    border-width: 2px;
    box-shadow: 6px 8px 6px 0 rgba(122, 47, 25, 0.3);
  }

  &:-webkit-autofill {
    -webkit-text-fill-color: #000 !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  &::placeholder {
    color: rgba(66, 89, 42, 0.5);
  }

  & + & {
    margin-top: 0.5rem;
  }
`;

const ErrorMessage = styled.p`
  color: #a60b0b;
  font-size: 0.875rem;
  margin: 0.25rem 0 0.25rem;
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ $hasError, errorMessage, ...props }, ref) => (
    <>
      <StyledInput ref={ref} $hasError={$hasError} {...props} />
      {$hasError && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  )
);

Input.displayName = "InputField";
