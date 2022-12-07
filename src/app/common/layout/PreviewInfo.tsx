import Link from "next/link";

import routes from "@/libs/routes";

export const PreviewInfo = () => (
  <p className="m-0">
    現在プレビュー表示がONになっています。
    <Link href={routes.exitPreview} className="underline">
      プレビュー表示をOFFにする
    </Link>
  </p>
);
