import Image from "next/image";

import { authorName } from "@/constants";
import { staticPath } from "@/libs/$path";

type Props = {
  height: number;
  width: number;
};

export const ProfileImage = ({ height, width }: Props) => (
  <Image
    priority
    src={staticPath.images.profile_png}
    height={height}
    width={width}
    alt={authorName}
  />
);
