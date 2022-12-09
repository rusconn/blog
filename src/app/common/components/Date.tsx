import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

export function Date({ dateString }: Props) {
  const date = parseISO(dateString);

  return (
    <time dateTime={dateString} suppressHydrationWarning>
      {format(date, "yyyy-MM-dd")}
    </time>
  );
}
