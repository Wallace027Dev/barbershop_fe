import styled from "styled-components";

export const Anchor = styled.a`
  color: #42592a;
  text-decoration: none;
  font-size: 0.6rem;
  font-weight: 500;
  cursor: pointer;

  @media (min-width: 768px) {
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export function Link({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return <Anchor href={href}>{children}</Anchor>;
}
