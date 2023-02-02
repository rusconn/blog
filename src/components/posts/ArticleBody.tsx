import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypePrism from "@mapbox/rehype-prism";

import "./prism.css";

type Props = {
  markdown: string;
};

export function ArticleBody({ markdown }: Props) {
  return (
    <ReactMarkdown
      // Markdown に HTML 要素を直書きすることがあるので、エスケープしない
      rehypePlugins={[rehypeRaw, rehypePrism]}
      /* eslint-disable react/no-unstable-nested-components */
      components={{
        a: ({ children, href }) =>
          href?.startsWith("/") || href === "" ? (
            <a {...{ href }}>{children}</a>
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
        h2: ({ children }) => <h3 className="text-xl">{children}</h3>,
        h3: ({ children }) => <h4 className="text-lg">{children}</h4>,
        h4: "h5",
        img: ({ src, alt, width: w, height: h }) => {
          const width = Number(w);
          const height = Number(h);

          if (!src || !alt || Number.isNaN(width) || Number.isNaN(height)) {
            throw new Error(`invalid img: ${JSON.stringify({ src, alt, width, height })}`);
          }

          return <img {...{ src, alt, width, height }} />;
        },
      }}
      /* eslint-enable react/no-unstable-nested-components */
    >
      {markdown}
    </ReactMarkdown>
  );
}
