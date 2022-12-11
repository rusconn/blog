import Link from "next/link";

import routes from "@/libs/routes";

export function PreviewInfo() {
  return (
    <p>
      現在プレビュー表示がONになっています。
      <Link href={routes.exitPreview} className="text-blue-600 underline">
        プレビュー表示をOFFにする
      </Link>
    </p>
  );
}
