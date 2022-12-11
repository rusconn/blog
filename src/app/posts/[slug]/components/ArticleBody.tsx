import { gql } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypePrism from "@mapbox/rehype-prism";

import type { PostArticleBodyFragment } from "@/generated/graphql";

import "./prism.css";

export const POST_ARTICLE_BODY_FRAGMENT = gql`
  fragment PostArticleBody on Post {
    body
  }
`;

type Props = {
  fragment: PostArticleBodyFragment;
};

export function ArticleBody({ fragment: { body } }: Props) {
  return (
    <ReactMarkdown
      // Markdown に HTML 要素を直書きすることがあるので、エスケープしない
      rehypePlugins={[rehypeRaw, rehypePrism]}
      /* eslint-disable react/no-unstable-nested-components */
      components={{
        a: ({ children, href }) =>
          href?.startsWith("/") || href === "" ? (
            <Link {...{ href }}>{children}</Link>
          ) : (
            <a target="_blank" rel="noreferrer" {...{ href }}>
              {children}
            </a>
          ),
        code: ({ children, inline }) =>
          inline ? (
            <code className="rounded-md bg-slate-800 py-1 px-1.5">{children}</code>
          ) : (
            <code>{children}</code>
          ),
        h1: ({ children }) => <h3 className="text-xl">{children}</h3>,
        h2: ({ children }) => <h4 className="text-lg">{children}</h4>,
        h3: "h5",
        img: ({ src, alt, width: w, height: h }) => {
          const width = Number(w);
          const height = Number(h);

          if (!src || !alt || Number.isNaN(width) || Number.isNaN(height)) {
            throw new Error(`invalid img: ${JSON.stringify({ src, alt, width, height })}`);
          }

          return <Image {...{ src, alt, width, height }} />;
        },
      }}
      /* eslint-enable react/no-unstable-nested-components */
    >
      {body}
    </ReactMarkdown>
  );
}
