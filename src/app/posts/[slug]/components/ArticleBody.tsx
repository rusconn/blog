import { gql } from "graphql-request";
import ReactMarkdown from "react-markdown";

import type { PostArticleBodyFragment } from "@/generated/graphql";

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
      className="mt-12"
      /* eslint-disable react/no-unstable-nested-components, react/jsx-props-no-spreading */
      components={{
        h1: ({ children, node: _node, ...props }) => (
          <h3 className="mb-6 mt-12 pb-1 text-xl font-semibold" {...props}>
            {children}
          </h3>
        ),
        h2: ({ children, node: _node, ...props }) => (
          <h4 className="mb-4 mt-8 pb-1 text-lg font-semibold" {...props}>
            {children}
          </h4>
        ),
        h3: ({ children, node: _node, ...props }) => (
          <h5 className="mb-3 mt-6 pb-1 font-semibold" {...props}>
            {children}
          </h5>
        ),
        a: ({ children, node: _node, ...props }) => (
          <a
            className="text-indigo-300 hover:underline"
            target="_blank"
            rel="noreferrer"
            {...props}
          >
            {children}
          </a>
        ),
        p: ({ children, node: _node, ...props }) => (
          <p className="mb-6" {...props}>
            {children}
          </p>
        ),
      }}
      /* eslint-enable react/no-unstable-nested-components, react/jsx-props-no-spreading */
    >
      {body}
    </ReactMarkdown>
  );
}
