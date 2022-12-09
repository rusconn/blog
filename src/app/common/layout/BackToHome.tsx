import Link from "next/link";

import { pagesPath } from "@/libs/$path";

export function BackToHome() {
  return <Link href={pagesPath.$url()}>← Back to home</Link>;
}
