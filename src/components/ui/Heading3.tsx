import styled from "styled-components";

const Container = styled.h3`
  font-weight: bold;
  color: #17376b;
  font-size: 1.5rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

export function H3({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}
