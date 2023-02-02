import datefns from "date-fns";
import datefnstz from "date-fns-tz";

type Props = {
  dateString: string;
};

export function Date({ dateString }: Props) {
  const date = datefns.parseISO(dateString);
  const localDate = datefnstz.utcToZonedTime(date, "Asia/Tokyo");

  return <time dateTime={dateString}>{datefns.format(localDate, "yyyy-MM-dd")}</time>;
}
