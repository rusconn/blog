import { css } from "@emotion/react";
import Link from "next/link";

import { authorName } from "@/constants";
import { pagesPath } from "@/libs/$path";
import * as utilStyles from "@/styles/utils";
import { ProfileImage } from "./ProfileImage";

const header = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const heading2Xl = css`
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 0 0 1rem;
`;

const authorNameStyle = css`
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;

type Props = {
  home?: boolean;
};

export const Header = ({ home }: Props) => (
  <header css={header}>
    {home ? (
      <>
        <ProfileImage height={144} width={144} />
        <h1 css={heading2Xl}>{authorName}</h1>
      </>
    ) : (
      <>
        <Link href={pagesPath.$url()}>
          <a>
            <ProfileImage height={96} width={96} />
          </a>
        </Link>
        <h2 css={utilStyles.headingLg}>
          <Link href={pagesPath.$url()} passHref>
            <a css={authorNameStyle}>{authorName}</a>
          </Link>
        </h2>
      </>
    )}
  </header>
);
