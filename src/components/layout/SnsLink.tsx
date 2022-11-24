type Props = {
  children: React.ReactNode;
  href: string;
  ariaLabel: string;
};

export const SnsLink = ({ children, href, ariaLabel }: Props) => (
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
