type Props = {
  children: React.ReactNode;
  href: string;
  ariaLabel: string;
};

export function SnsLink({ children, href, ariaLabel }: Props) {
  return (
    <a
      className="inline-block rounded-full p-2 align-middle hover:bg-slate-800"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
