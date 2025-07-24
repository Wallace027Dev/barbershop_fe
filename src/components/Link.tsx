import styled from "styled-components";

export const Anchor = styled.a`
  color: #38a5a8;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    text-decoration: underline;
    color: #17376b;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export function Link({
  children,
  href
}: {
  children: React.ReactNode;
  href: string;
}) {
  return <Anchor href={href}>{children}</Anchor>;
}
