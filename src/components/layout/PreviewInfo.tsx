import { css } from "@emotion/react";
import Link from "next/link";

import routes from "@/libs/routes";

const previewText = css`
  margin: 0;
`;

const previewOff = css`
  text-decoration: underline;
`;

export const PreviewInfo = () => (
  <p css={previewText}>
    現在プレビュー表示がONになっています。
    <Link href={routes.exitPreview} passHref>
      <a css={previewOff}>プレビュー表示をOFFにする</a>
    </Link>
  </p>
);
