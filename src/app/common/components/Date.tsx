import { parseISO, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

type Props = {
  dateString: string;
};

export function Date({ dateString }: Props) {
  const date = parseISO(dateString);
  const localDate = utcToZonedTime(date, "Asia/Tokyo");

  return <time dateTime={dateString}>{format(localDate, "yyyy-MM-dd")}</time>;
}
