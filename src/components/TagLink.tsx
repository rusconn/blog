type Props = {
  slug: string;
  name: string;
};

export function TagLink({ slug, name }: Props) {
  return (
    <a
      href={`/tags/${slug}`}
      className="inline-block rounded-md border border-slate-600 bg-slate-900 py-1.5 px-2 text-gray-300 hover:border-sky-400 hover:text-sky-400 hover:no-underline"
    >
      {name}
    </a>
  );
}
