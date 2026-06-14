type Props = {
  date: Date;
  format?: 'absolute' | 'relative';
};

const formatAbsolute = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
};

const formatRelative = (date: Date, now: Date = new Date()): string => {
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (60 * 1000));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}日前`;
  }
  if (diffHours > 0) {
    return `${diffHours}時間前`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes}分前`;
  }
  return 'たった今';
};

export const Timestamp = ({ date, format = 'absolute' }: Props) => {
  const label =
    format === 'relative' ? formatRelative(date) : formatAbsolute(date);
  return <time dateTime={date.toISOString()}>{label}</time>;
};
