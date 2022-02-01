import Link from "next/link";

import { pagesPath } from "@/libs/$path";

export const BackToHome = () => (
  <Link href={pagesPath.$url()}>
    <a>← Back to home</a>
  </Link>
);
