import { FaGithub, FaTwitter } from "react-icons/fa";
import { css } from "@emotion/react";

import { SnsLink } from "./SnsLink";

const snsLinks = css`
  text-align: right;

  & > span:not(:first-of-type) {
    margin-left: 0.6rem;
  }
`;

const snsIcon = css`
  width: 1.5rem;
  height: 1.5rem;
`;

export const Footer = () => (
  <footer>
    <div css={snsLinks}>
      <span>
        <SnsLink href="https://twitter.com/rusconn" ariaLabel="rusconnのTwitterへ">
          <FaTwitter css={snsIcon} />
        </SnsLink>
      </span>
      <span>
        <SnsLink href="https://github.com/rusconn" ariaLabel="rusconnのGitHubへ">
          <FaGithub css={snsIcon} />
        </SnsLink>
      </span>
    </div>
  </footer>
);
