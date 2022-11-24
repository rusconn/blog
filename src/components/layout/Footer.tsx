import { FaGithub, FaTwitter } from "react-icons/fa";

import { SnsLink } from "./SnsLink";

export const Footer = () => (
  <footer>
    <div className="flex justify-end space-x-[0.6rem] text-left">
      <span>
        <SnsLink href="https://twitter.com/rusconn" ariaLabel="rusconnのTwitterへ">
          <FaTwitter className="snsIcon" />
        </SnsLink>
      </span>
      <span>
        <SnsLink href="https://github.com/rusconn" ariaLabel="rusconnのGitHubへ">
          <FaGithub className="snsIcon" />
        </SnsLink>
      </span>
    </div>
  </footer>
);
