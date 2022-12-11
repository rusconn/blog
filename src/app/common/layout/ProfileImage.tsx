import Image from "next/image";

import { authorName } from "@/constants";
import { staticPath } from "@/libs/$path";

type Props = {
  height: number;
  width: number;
};

export function ProfileImage({ height, width }: Props) {
  return (
    <Image
      className="rounded-full bg-gray-100 p-1"
      priority
      src={staticPath.images.profile_png}
      height={height}
      width={width}
      alt={authorName}
    />
  );
}
