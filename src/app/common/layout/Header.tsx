import Link from "next/link";
import { FaTwitter, FaGithub } from "react-icons/fa";

import { siteTitle } from "@/constants";
import { pagesPath } from "@/libs/$path";
import { ProfileImage } from "./ProfileImage";
import { SnsIcon } from "./SnsIcon";
import { SnsLink } from "./SnsLink";

export function Header() {
  return (
    <header className="flex justify-between">
      <Link
        className="-ml-2 flex items-center space-x-2 rounded-lg p-2 hover:bg-slate-800"
        href={pagesPath.$url()}
      >
        <ProfileImage height={36} width={36} />
        <h1 className="text-2xl font-bold">{siteTitle}</h1>
      </Link>
      <ul className="flex items-center justify-end">
        <li>
          <SnsLink href="https://twitter.com/rusconn" ariaLabel="rusconnのTwitterへ">
            <SnsIcon Icon={FaTwitter} />
          </SnsLink>
        </li>
        <li>
          <SnsLink href="https://github.com/rusconn" ariaLabel="rusconnのGitHubへ">
            <SnsIcon Icon={FaGithub} />
          </SnsLink>
        </li>
      </ul>
    </header>
  );
}
