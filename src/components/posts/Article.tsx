import type { ComponentProps } from "react";

import { Date, TagsNav } from "@/components";
import { ArticleBody } from "./ArticleBody";

type Props = {
  title: string;
  date: ComponentProps<typeof Date>["dateString"];
  tags: ComponentProps<typeof TagsNav>["tags"];
  markdown: ComponentProps<typeof ArticleBody>["markdown"];
};

export function Article({ title, date, tags, markdown }: Props) {
  return (
    <article>
      <div className="font-medium text-gray-300">
        <Date dateString={date} />
      </div>
      <h2 className="m-0 text-2xl">{title}</h2>
      <div className="mt-2 text-gray-300">
        <TagsNav ariaLabel="記事のタグ" {...{ tags }} />
      </div>
      <div className="mt-12 last:[&>*]:mb-0">
        <ArticleBody {...{ markdown }} />
      </div>
    </article>
  );
}
