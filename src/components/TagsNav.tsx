import type { ComponentProps } from "react";

import { TagList } from "./TagList";

type Props = {
  ariaLabel: string;
  tags: ComponentProps<typeof TagList>["tags"];
};

export function TagsNav({ ariaLabel, tags }: Props) {
  return (
    <nav aria-label={ariaLabel}>
      <TagList {...{ tags }} />
    </nav>
  );
}
