import type { ComponentProps } from "react";

import { Date } from "./Date";

type Props = {
  href: ComponentProps<"a">["href"];
  date: ComponentProps<typeof Date>["dateString"];
  title: string;
};

export function PostLink({ href, date, title }: Props) {
  return (
    <a
      className="-ml-2 block rounded-lg p-2 text-gray-50 hover:bg-slate-800 hover:no-underline"
      {...{ href }}
    >
      <div className="text-sm font-medium text-gray-300">
        <Date dateString={date} />
      </div>
      <h3 className="m-0 text-lg font-semibold">{title}</h3>
    </a>
  );
}
