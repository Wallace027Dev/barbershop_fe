import styled from "styled-components";

const Container = styled.h2`
  font-weight: bold;
  color: #38A5A8;
  font-size: 1.25rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export function H2({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}
