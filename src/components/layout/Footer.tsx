import { FaGithub, FaTwitter } from "react-icons/fa";

import { SnsIcon } from "./SnsIcon";
import { SnsLink } from "./SnsLink";

export const Footer = () => (
  <footer>
    <div className="flex justify-end space-x-2 text-left">
      <span>
        <SnsLink href="https://twitter.com/rusconn" ariaLabel="rusconnのTwitterへ">
          <SnsIcon Icon={FaTwitter} />
        </SnsLink>
      </span>
      <span>
        <SnsLink href="https://github.com/rusconn" ariaLabel="rusconnのGitHubへ">
          <SnsIcon Icon={FaGithub} />
        </SnsLink>
      </span>
    </div>
  </footer>
);
