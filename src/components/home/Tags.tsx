import type { Tag } from "@/generated/graphql";
import { TagList } from "@/components/common";

import * as utilStyles from "@/styles/utils";

type Props = {
  tags: Pick<Tag, "id" | "slug" | "name">[];
};

export const Tags = ({ tags }: Props) => (
  <section>
    <TagList tags={tags} css={utilStyles.tagsList} itemCss={utilStyles.tagsListItem} />
  </section>
);
