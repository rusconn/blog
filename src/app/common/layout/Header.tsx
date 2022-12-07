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
        <h1 className="mb-4 text-4xl font-extrabold">{authorName}</h1>
      </>
    ) : (
      <>
        <Link href={pagesPath.$url()}>
          <ProfileImage height={96} width={96} />
        </Link>
        <h2 className="headingLg">
          <Link href={pagesPath.$url()} className="text-inherit hover:no-underline">
            {authorName}
          </Link>
        </h2>
      </>
    )}
  </header>
);
