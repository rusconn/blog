import type { ComponentProps } from "react";

import { TagLink } from "./TagLink";

type Props = {
  tags: ComponentProps<typeof TagLink>[];
};

export function TagList({ tags }: Props) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-1">
      {tags.map(({ slug, name }) => (
        <li className="text-xs font-medium" key={slug}>
          <TagLink {...{ slug, name }} />
        </li>
      ))}
    </ul>
  );
}
