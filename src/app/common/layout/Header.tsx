import Link from "next/link";
import { FaTwitter, FaGithub } from "react-icons/fa";

import { authorName, siteTitle } from "@/constants";
import { pagesPath } from "@/libs/$path";
import { ProfileImage } from "./ProfileImage";
import { SnsIcon } from "./SnsIcon";
import { SnsLink } from "./SnsLink";

export function Header() {
  return (
    <header className="flex justify-center">
      <div className="flex w-full max-w-3xl items-center justify-between px-6">
        <Link
          className="-ml-2 flex items-center gap-2 rounded-lg p-2 text-gray-50 hover:bg-slate-800 hover:no-underline"
          href={pagesPath.$url()}
        >
          <ProfileImage height={36} width={36} />
          <h1 className="m-0 h-9">{siteTitle}</h1>
        </Link>
        <nav aria-label={`${authorName}のSNS`}>
          <ul className="m-0 flex list-none items-center justify-end">
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
        </nav>
      </div>
    </header>
  );
}
