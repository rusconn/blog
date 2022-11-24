import Link from "next/link";

import { authorName } from "@/constants";
import { pagesPath } from "@/libs/$path";
import { ProfileImage } from "./ProfileImage";

type Props = {
  home?: boolean;
};

export const Header = ({ home }: Props) => (
  <header className="flex flex-col items-center">
    {home ? (
      <>
        <ProfileImage height={144} width={144} />
        <h1 className="mb-4 text-[2.5rem] font-extrabold leading-[1.2] tracking-tighter">
          {authorName}
        </h1>
      </>
    ) : (
      <>
        <Link href={pagesPath.$url()}>
          <a>
            <ProfileImage height={96} width={96} />
          </a>
        </Link>
        <h2 className="headingLg">
          <Link href={pagesPath.$url()} passHref>
            <a className="text-inherit hover:no-underline">{authorName}</a>
          </Link>
        </h2>
      </>
    )}
  </header>
);
