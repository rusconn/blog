import { css } from "@emotion/react";

const snsLink = css`
  opacity: 0.4;
  color: black;

  @media (prefers-color-scheme: dark) {
    color: white;
  }

  &:hover {
    opacity: 0.7;
  }
`;

type Props = {
  children: React.ReactNode;
  href: string;
  ariaLabel: string;
};

export const SnsLink = ({ children, href, ariaLabel }: Props) => (
  <a css={snsLink} href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
    {children}
  </a>
);
