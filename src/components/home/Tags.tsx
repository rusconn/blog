import type { HomeQuery } from "@/generated/graphql";
import { TagList } from "@/components/common";

type Props = Pick<HomeQuery, "tags">;

export const Tags = ({ tags }: Props) => (
  <section>
    <TagList tags={tags} />
  </section>
);
