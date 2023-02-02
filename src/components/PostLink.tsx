import type { ComponentProps } from "react";

import { Date } from "./Date";

type Props = {
  slug: string;
  date: ComponentProps<typeof Date>["dateString"];
  title: string;
};

export function PostLink({ slug, date, title }: Props) {
  return (
    <a
      className="-ml-2 block rounded-lg p-2 text-gray-50 hover:bg-slate-800 hover:no-underline"
      href={`/posts/${slug}`}
    >
      <div className="text-sm font-medium text-gray-300">
        <Date dateString={date} />
      </div>
      <h3 className="m-0">{title}</h3>
    </a>
  );
}
