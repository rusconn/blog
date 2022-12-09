type Props = {
  children: React.ReactNode;
  href: string;
  ariaLabel: string;
};

export function SnsLink({ children, href, ariaLabel }: Props) {
  return (
    <a
      className="text-black opacity-50 hover:opacity-80 dark:text-white"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
