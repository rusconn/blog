import Link from "next/link";

import routes from "@/libs/routes";

export function PreviewInfo() {
  return (
    <div className="bg-yellow-50 p-4 text-center">
      <p className="m-0 text-slate-900">
        現在プレビュー表示がONになっています。
        <Link href={routes.exitPreview} className="text-blue-600">
          プレビュー表示をOFFにする
        </Link>
      </p>
    </div>
  );
}
