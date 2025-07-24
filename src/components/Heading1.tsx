import styled from "styled-components";

const Container = styled.h1`
  font-weight: bold;
  color: #1E707B;
  font-size: 1.5rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

export function H1({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}
