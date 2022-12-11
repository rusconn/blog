type Props = {
  children: React.ReactNode;
  href: string;
  ariaLabel: string;
};

export function SnsLink({ children, href, ariaLabel }: Props) {
  return (
    <a
      className="inline-block rounded-full p-2 align-middle text-gray-50 hover:bg-slate-800 hover:no-underline"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
