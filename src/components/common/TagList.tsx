import { SerializedStyles } from "@emotion/react";

import { Tag } from "@/generated/graphql";
import { TagLink } from "./TagLink";

type Props = {
  tags: Pick<Tag, "id" | "slug" | "name">[];
  className?: string;
  itemCss?: SerializedStyles;
};

export const TagList = ({ tags, className, itemCss }: Props) => (
  <ul className={className}>
    {tags.map(({ id, slug, name }) => (
      <li key={id} css={itemCss}>
        <TagLink slug={slug} name={name} />
      </li>
    ))}
  </ul>
);
