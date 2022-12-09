import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
};

export function SnsIcon({ Icon }: Props) {
  return <Icon size="1.5rem" />;
}
